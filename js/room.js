class Room {
  constructor() {
    this.model = this.createRoomModel();
  }

  createRoomModel() {
    const floorGeometry = new THREE.PlaneGeometry(room_size, room_size);
    const wallGeometry  = new THREE.PlaneGeometry(room_size, room_height);
    const ObstructionGeometry = new THREE.CylinderGeometry(5, 5, room_height, 25);

    const texture_floor1 = new THREE.TextureLoader().load("imgs/floor.jpg");		// 사진을 가져옴
    texture_floor1.wrapS = THREE.RepeatWrapping;									// 수평으로 사진의 반복을 가능하도록 함
    texture_floor1.wrapT = THREE.RepeatWrapping;									// 수직으로 사진의 반복을 가능하도록 함 
    texture_floor1.repeat.set(8, 8);

    const texture_floor2 = new THREE.TextureLoader().load("imgs/floor_bump.jpg");
    texture_floor2.wrapS = THREE.RepeatWrapping;
    texture_floor2.wrapT = THREE.RepeatWrapping;
    texture_floor2.repeat.set(8, 8);

    const texture_wall1 = new THREE.TextureLoader().load("imgs/wall.jpg");
    texture_wall1.wrapS = THREE.RepeatWrapping;
    texture_wall1.wrapT = THREE.RepeatWrapping;
    texture_wall1.repeat.set(32, 2);

    const texture_wall2 = new THREE.TextureLoader().load("imgs/wall_bump.jpg");
    texture_wall2.wrapS = THREE.RepeatWrapping;
    texture_wall2.wrapT = THREE.RepeatWrapping;
    texture_wall2.repeat.set(32, 2);

    const floorMaterial = new THREE.MeshStandardMaterial( { map: texture_floor1, bumpMap: texture_floor2 } );
    const wallMaterial  = new THREE.MeshStandardMaterial( { map: texture_wall1, bumpMap: texture_wall2 } );

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotateX(-Math.PI / 2);

    
    /* 동서남북으로 벽을 만듦 */
    const wall_n = new THREE.Mesh(wallGeometry, wallMaterial);
    wall_n.position.set(0, room_height / 2, -room_size / 2);

    const wall_e = new THREE.Mesh(wallGeometry, wallMaterial);
    wall_e.rotateY(-Math.PI / 2);
    wall_e.position.set(room_size / 2, room_height / 2, 0);

    const wall_w = new THREE.Mesh(wallGeometry, wallMaterial);
    wall_w.rotateY(-Math.PI / 2);
    wall_w.rotateY(Math.PI);
    wall_w.position.set(-room_size / 2, room_height / 2, 0);

    const wall_s = new THREE.Mesh(wallGeometry, wallMaterial);
    wall_s.rotateY(Math.PI);
    wall_s.position.set(0, room_height / 2, room_size / 2);
    
    const wall_Obstruction = new THREE.Mesh(ObstructionGeometry, wallMaterial);
    wall_Obstruction.scale.set(0.5, 1, 0.5);
    wall_Obstruction.position.set(-room_size / 2, room_height / 2, room_height / 2);
    

    const group = new THREE.Group();
    group.add(floor);
    group.add(wall_n); 
    group.add(wall_s);
    group.add(wall_e); 
    group.add(wall_w);
    return group;
  }

  getModel() {
    return this.model;
  }
}
