
// Simple Earth visualization with THREE.js
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('earth-canvas');
    
    if (!container) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create Earth
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    
    // Base material with blue color for oceans
    const material = new THREE.MeshBasicMaterial({
        color: 0x1e40af,
        transparent: true,
        opacity: 0.8
    });
    
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    
    // Add a wireframe to the earth
    const wireframeGeometry = new THREE.SphereGeometry(2.05, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x4ade80,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);
    
    // Add green patches for continents (simplified)
    for (let i = 0; i < 10; i++) {
        const continentGeometry = new THREE.SphereGeometry(2.01, 8, 8);
        const continentMaterial = new THREE.MeshBasicMaterial({
            color: 0x4ade80,
            transparent: true,
            opacity: 0.6
        });
        
        // Only create a small section of the sphere for each "continent"
        const continent = new THREE.Mesh(continentGeometry, continentMaterial);
        
        // Random rotation to place the continent somewhere on the globe
        continent.rotation.x = Math.random() * Math.PI;
        continent.rotation.y = Math.random() * Math.PI;
        continent.rotation.z = Math.random() * Math.PI;
        
        // Scale down to only show a portion of the sphere
        continent.scale.x = 0.3;
        continent.scale.y = 0.3;
        continent.scale.z = 0.05;
        
        scene.add(continent);
    }
    
    // Position camera
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate Earth
        earth.rotation.y += 0.002;
        wireframe.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
});
