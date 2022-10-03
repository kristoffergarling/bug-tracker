export interface User {
  id: string;
  firstName: string;
  lastName: string;
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
  id: string;
  title: string;
  description: string;
  contributors: ProjectContributor[];
  bugs: Array<{ id: string }>;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectPayload {
  title: string;
  description: string;
  contributors: string[];
}
