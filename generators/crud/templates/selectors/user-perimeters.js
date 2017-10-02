import { split, find } from 'lodash';

export const getUserPerimeters = state => {
  if (
    !state.authentication ||
    !state.authentication.user ||
    !state.authentication.user.roles
  ) {
    return [];
  }
  const userAuthRoles = state.authentication.user.roles;

  const userRole = find(userAuthRoles, userAuthRole => {
    if (!userAuthRole.name) return false;
    return userAuthRole.name.toLowerCase() === 'user';
  });

  const userPerimeters =
    userRole && userRole.params && userRole.params.perimeters
      ? split(userRole.params.perimeters, ',')
      : [];

  return userPerimeters;
};

export default { getUserPerimeters };
