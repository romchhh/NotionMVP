const typeDefs = `
  type Checklist {
    text: String
    completed: Boolean
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    status: String!
    priority: String
    tags: [String]
    assignee: String
    dueDate: String
    checklist: [Checklist]
    createdAt: String
    updatedAt: String
  }

  input ChecklistInput {
    text: String
    completed: Boolean
  }

  input TaskInput {
    title: String!
    description: String
    status: String!
    priority: String
    tags: [String]
    assignee: String
    dueDate: String
    checklist: [ChecklistInput]
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
    tasksByStatus(status: String!): [Task]
  }

  type Mutation {
    createTask(input: TaskInput!): Task
    updateTask(id: ID!, input: TaskInput!): Task
    deleteTask(id: ID!): Task
    updateTaskStatus(id: ID!, status: String!): Task
  }
`;

module.exports = typeDefs; 