import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import MGService from '../../Services/MGServices';
import { IManagementGroup } from '../../type.d';

const columns = [
  { title: 'Name', field: 'name' },
];

const ManagementGroup: React.FC = () => {
  const [mg, setMg] = useState<IManagementGroup[]>([]);

  const getManagementGroup = async () => {
    const mgNew = await MGService.getAllManagementGroup();
    setMg(mgNew);
  };

  useEffect(() => {
    getManagementGroup();
  }, []);

  return (
    <MaterialTable
      title="Management Groups"
      columns={columns}
      data={mg}
      editable={{
        onRowAdd: (newData: any) => {
          const newMg: IManagementGroup = {
            name: newData.name,
          };
          return MGService.createManagementGroup(newMg)
            .then((data) => {
              setMg([...mg, data]);
            });
        },
        onRowUpdate: (newData: any, oldData: any) => {
          const newMg: IManagementGroup = {
            id: newData.id,
            name: newData.name,
          };
          return MGService.updateManagementGroup(newMg)
            .then((response) => {
              const dataUpdate = [...mg];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setMg([...dataUpdate]);
            });
        },
        onRowDelete: (oldData: any) => MGService.deleteManagementGroup(oldData.id!)
          .then((response) => {
            const dataDelete = [...mg];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setMg([...dataDelete]);
          }),
      }}
    />
  );
};

export default ManagementGroup;
