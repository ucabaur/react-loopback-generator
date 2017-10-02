import { intersection, find } from 'lodash';
import crudRoutes from '../crud-routes/crud-routes.json';

export const canWrite = (userPerimeters, componentName) => {
  const route = find(
    crudRoutes.active,
    crudRoute => crudRoute.componentName === componentName,
  );

  if (!route || !route.ACL || !route.ACL.WRITE) return false;

  return intersection(route.ACL.WRITE, userPerimeters).length > 0;
};

export const canRead = (userPerimeters, componentName) => {
  const route = find(
    crudRoutes.active,
    crudRoute => crudRoute.componentName === componentName,
  );

  if (!route || !route.ACL || !route.ACL.READ) return false;

  return intersection(route.ACL.READ, userPerimeters).length > 0;
};

export default { canWrite, canRead };
