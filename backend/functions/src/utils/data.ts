import {db} from '../utils/admin';
import {IBuilding} from '../../../../shared/type.d';

class DataService {
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
              reject(building);
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
              reject(building);
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
}

export default DataService;
