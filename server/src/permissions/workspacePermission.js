export const hasRole = (
  member,
  roles
) => {
  return roles.includes(member.role);
};

export const isOwner = (
  member
) => hasRole(member, ["OWNER"]);

export const isTeacher = (
  member
) => hasRole(member, ["TEACHER"]);

export const isStudent = (
  member
) => hasRole(member, ["STUDENT"]);

export const isMember = (
  member
) => hasRole(member, ["MEMBER"]);