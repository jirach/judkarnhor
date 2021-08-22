import {db} from '../utils/admin';
import {IBuilding, IRoom} from '../../../../shared/type.d';

class DataService {
    //* ************************************************************************
    // Building
    //* ************************************************************************
    static getBuildingByManagementGroup = async (id: string): Promise<IBuilding[]> => {
      const buildings: IBuilding[] = [];

      await db.collection('buildings')
          .where('managementGroup.id', '==', id)
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((obj) => {
              const data = obj.data();
              const building: IBuilding = {
                id: obj.id,
                name: data.name,
                imageUrl: data.imageUrl,
                managementGroup: data.managementGroup,
              };
              buildings.push(building);
            });
          });

      return buildings;
    }

    static isBuildingNameExist = async (mgId: string, name: string): Promise<boolean> => {
      const snapshot = await db.collection('buildings')
          .where('name', '==', name)
          .where('managementGroup.id', '==', mgId)
          .limit(1)
          .get();
      if (snapshot.size > 0) {
        return true;
      } else {
        return false;
      }
    }

    static isBuildingIdExist = async (id: string): Promise<boolean> => {
      return new Promise<boolean>((resolve, reject) => {
        db.collection('buildings').doc(id).get()
            .then((doc) => {
                doc.exists ? resolve(true) : resolve(false);
            })
            .catch((error) => {
              console.error('Error isBuildingIdExist: ', error);
              reject(error);
            });
      });
    }

    static createBuilding = async (building: IBuilding): Promise<IBuilding> => {
      return new Promise<IBuilding>((resolve, reject) => {
        db.collection('buildings').add(building)
            .then((obj) => {
              resolve({id: obj.id, ...building});
            })
            .catch((error) => {
              console.error('Error createBuilding: ', error);
              reject(error);
            });
      });
    }

    static updateBuilding = async (building: IBuilding): Promise<IBuilding> => {
      return new Promise<IBuilding>((resolve, reject) => {
        db.collection('buildings').doc(building.id as string).update(building)
            .then(() => {
              resolve(building);
            })
            .catch((error) => {
              console.error('Error updateBuilding: ', error);
              reject(error);
            });
      });
    }

    static deleteBuilding = async (id: string): Promise<boolean> => {
      return new Promise<boolean>((resolve, reject) => {
        db.collection('buildings').doc(id).delete()
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              console.error('Error deleteBuilding: ', error);
              reject(error);
            });
      });
    }

    //* ************************************************************************
    // Room
    //* ************************************************************************
    static createRoom = async (room: IRoom): Promise<IRoom> => {
      return new Promise<IRoom>((resolve, reject) => {
        db.collection('buildings').doc(room.buildingId).collection('rooms').add(room)
            .then((obj) => {
              room.id = obj.id;
              resolve({...room});
            })
            .catch((error) => {
              console.error('Error createRoom: ', error);
              reject(error);
            });
      });
    }

    static isRoomExist = async (room: IRoom): Promise<boolean> => {
      const snapshot = await db.collection('buildings').doc(room.buildingId).collection('rooms')
          .where('floor', '==', room.floor)
          .where('roomNumber', '==', room.roomNumber)
          .limit(1)
          .get();
      if (snapshot.size > 0) {
        return true;
      } else {
        return false;
      }
    }

    static getRoomByBuilding = async (id: string): Promise<IRoom[]> => {
      const snapshot = await db.collection('buildings')
          .doc(id)
          .collection('rooms')
          .orderBy('floor')
          .orderBy('roomNumber')
          .get();

      const rooms: IRoom[] = snapshot.docs.map((doc) => {
        const room: IRoom = {
          id: doc.id,
          buildingId: doc.data().buildingId,
          floor: doc.data().floor,
          roomNumber: doc.data().roomNumber,
        };
        return room;
      });
      console.log(rooms);
      return rooms;
    }

    static getRoomByBuildingAndFloor = async (id: string, floor: number): Promise<IRoom[]> => {
      const snapshot = await db.collection('buildings')
          .doc(id)
          .collection('rooms')
          .where('floor', '==', floor)
          .orderBy('roomNumber')
          .get();

      const rooms: IRoom[] = snapshot.docs.map((doc) => {
        const room: IRoom = {
          id: doc.id,
          buildingId: doc.data().buildingId,
          floor: doc.data().floor,
          roomNumber: doc.data().roomNumber,
        };
        return room;
      });
      return rooms;
    }

    static updateRoom = async (room: IRoom): Promise<IRoom> => {
      return new Promise<IRoom>((resolve, reject) => {
        db.collection('buildings').doc(room.buildingId).collection('rooms').doc(room.id as string).update(room)
            .then(() => {
              resolve(room);
            })
            .catch((error) => {
              console.error('Error updateRoom: ', error);
              reject(error);
            });
      });
    }

    static deleteRoom = async (building: string, id: string): Promise<boolean> => {
      return new Promise<boolean>((resolve, reject) => {
        db.collection('buildings').doc(building).collection('rooms').doc(id).delete()
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              console.error('Error deleteRoom: ', error);
              reject(error);
            });
      });
    }
}

export default DataService;
