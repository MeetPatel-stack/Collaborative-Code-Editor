export const isOwner = (
  member
) => {
  return member?.role === "OWNER";
};

export const isTeacher = (
  member
) => {
  return member?.role === "TEACHER";
};

export const isStudent = (
  member
) => {
  return member?.role === "STUDENT";
};

export const isMember = (
  member
) => {
  return member?.role === "MEMBER";
};