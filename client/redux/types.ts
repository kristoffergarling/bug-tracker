export interface User {
  _id: string;
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
  isAdmin: boolean;
  registerDate: Date;
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

export type BugPriority = "low" | "medium" | "high";

export type BugStatus = "closed" | "open";

export interface BugPayload {
  title: string;
  description: string;
  priority: BugPriority;
  createdBy: User | null;
}

export interface BugState {
  _id: string;
  title: string;
  description: string;
  priority: BugPriority;
  status: BugStatus;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
  closedBy?: User;
  closeAt?: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  bugId: string;
  body: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}
