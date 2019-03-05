const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query{
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id: Int
        title: String,
        author: String,
        description: String,
        topic: String,
        url: String
    }  
`);

const coursesData = [
  {
    id: 1,
    title: "Test",
    author: "Carlos Hurtado",
    description: "Test asdasdad !",
    topic: "Node.js",
    url: "https://google.com"
  },
  {
    id: 2,
    title: "Testasdasdasd",
    author: "Carlos Hurtado",
    description: "Test asdasdad !",
    topic: "Node.js",
    url: "https://google.com"
  },
  {
    id: 3,
    title: "Testasdasd",
    author: "Carlos Hurtado",
    description: "Test asdasdad !",
    topic: "Elixir",
    url: "https://google.com"
  },
  {
    id: 4,
    title: "Test",
    author: "Carlos Hurtado",
    description: "Test asdasdad !",
    topic: "Go",
    url: "https://google.com"
  }
];

const getCourse = ({ id }) => {
  return coursesData.find(course => course.id === id);
};

const getCourses = ({ topic }) => {
  if (topic) {
    return coursesData.filter(course => {
      return course.topic === topic;
    });
  }

  return coursesData;
};

const updateCourseTopic = ({ id, topic }) => {
  const course = coursesData.find(course => course.id === id);
  course.topic = topic;
  return course;
};

//Root resolver
const root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic
};

const app = express();
app.use(
  "/graphql",
  express_graphql({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () =>
  console.log("Express GraphQL Server running on http://localhost:4000/graphql")
);
