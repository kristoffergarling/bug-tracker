export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  registerDate: Date;
}

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CredentialsPayload {
  email: string;
  password: string;
}

export interface ProjectContributor {
  id: string;
  joinDate: Date;
  user: User;
}

export interface ProjectState {
  _id: string;
  title: string;
  description: string;
  contributors: ProjectContributor[];
  bugs: Array<{ id: string }>;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectPayload {
  title: string;
  description: string;
  contributors: string[];
  createdBy: string;
}
