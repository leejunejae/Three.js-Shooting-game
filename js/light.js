class Light {
  constructor(position) {
    this.object = this.createLight();
    this.object.position.set(position.x, position.y, position.z);
  }

  createLight() {
    const light = new THREE.PointLight(0xffffff, 2, 50);

    const circle = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshBasicMaterial(0xffffff)
    );

    this.circle = circle;
    light.add(circle);
    this.light = light;
    
    return light;
  }

  animate(dtime, etime) {
    const scale = ((Math.sin(etime * 2) + 1) / 2 + 4) / 5;
    this.circle.scale.set(scale, scale, scale);
  }
}
