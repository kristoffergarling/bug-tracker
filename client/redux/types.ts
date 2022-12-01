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

export interface ProjectState {
  _id: string;
  title: string;
  description: string;
  contributors: string[];
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

export interface EditProjectPayload {
  title: string;
  description: string;
}

export type BugPriority = "low" | "medium" | "high";

export type BugStatus = "closed" | "open";

export interface EditBugPayload {
  title: string;
  description: string;
  priority: BugPriority;
}

export interface BugPayload {
  title: string;
  description: string;
  priority: BugPriority;
  createdBy: string | null;
}

export interface BugState {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  priority: BugPriority;
  status: BugStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isOpen: boolean;
  closedBy?: User;
  closeAt?: Date;
  comments: string[];
}

export interface Comment {
  bugId: string;
  text: string;
  createdAt: Date;
  createdBy: string;
}

export interface CommentPayload {
  text: string;
  bugId: string;
  createdBy: string;
}
