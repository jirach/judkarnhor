import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import Alert from '@material-ui/lab/Alert';
import MGService from '../../Services/MGServices';
import { IManagementGroup } from '../../type.d';

const columns = [
  { title: 'Name', field: 'name' },
];

const ManagementGroup: React.FC = () => {
  const [mg, setMg] = useState<IManagementGroup[]>([]);
  const [error, setError] = useState('');

  const getManagementGroup = async () => {
    const response = await MGService.getAllManagementGroup();
    setMg(response.data);
  };

  useEffect(() => {
    getManagementGroup();
  }, []);

  return (
    <MaterialTable
      title="Management Groups"
      columns={columns}
      data={mg}
      components={{
        Toolbar: (props) => (
          <div>
            <MTableToolbar {...props} />
            { error.length > 0 && <Alert severity="error" onClose={() => { setError(''); }}>{error}</Alert>}
          </div>
        ),
      }}
      editable={{
        onRowAdd: (newData: any) => {
          const newMg: IManagementGroup = {
            name: newData.name,
          };
          return MGService.createManagementGroup(newMg)
            .then((response) => {
              setMg([...mg, response.data]);
            })
            .catch((response) => {
              setError(response.data);
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
