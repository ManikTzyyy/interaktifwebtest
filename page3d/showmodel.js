const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x77cdff);
      document.getElementById("model-viewer").appendChild(renderer.domElement);

    

      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.maxPolarAngle = Math.PI / 2;

      const dracoLoader = new THREE.DRACOLoader();
      dracoLoader.setDecoderPath(
        "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/libs/draco/"
      );
      const loader = new THREE.GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      function loadModel(modelPath) {
        // Menghapus model sebelumnya
        while (scene.children.length > 0) {
          scene.remove(scene.children[0]);
        }

        loader.load(
          modelPath,
          function (gltf) {
            const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Cahaya ambient
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Cahaya arah
            directionalLight.position.set(0, 90, 0);
            scene.add(directionalLight);

            const directionalLightHelper = new THREE.DirectionalLightHelper(
              directionalLight,
              1
            ); // '1' adalah ukuran helper
            // scene.add(directionalLightHelper);

            const model = gltf.scene;
            scene.add(model);
            model.position.set(0, 0, 0);
            model.scale.set(2, 2, 2);
            camera.position.set(0, 15, 25); // Menyesuaikan posisi kamera

            // Atur ukuran renderer agar sesuai dengan ukuran modal
            resizeRenderer();
          },
          undefined,
          function (error) {
            console.error(error);
          }
        );

        // Loop animasi
        animate();
      }

      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      function resizeRenderer() {
        const modalBody = document.querySelector(".modal-body");
        const width = modalBody.clientWidth;
        const height = modalBody.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      // Mengatur saat modal dibuka/tutup
      const modelModal = document.getElementById("modelModal");
      modelModal.addEventListener("shown.bs.modal", resizeRenderer); // Resize saat modal dibuka
      modelModal.addEventListener("hidden.bs.modal", () => {
        // Menghapus model saat modal ditutup
        while (scene.children.length > 0) {
          scene.remove(scene.children[0]);
        }
      });

      window.addEventListener("resize", resizeRenderer); // Resize saat jendela diubah