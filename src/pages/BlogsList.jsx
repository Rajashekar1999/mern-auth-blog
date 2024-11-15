import React from "react";

const blogs = [
  {
    id: 1,
    title: "How to Learn React",
    content:
      "React is a JavaScript library for building user interfaces. It allows developers to create web applications that are fast and scalable.",
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures",
    content:
      "A closure is a feature in JavaScript where a function retains access to its lexical scope even when the function is executed outside of that scope.",
  },
  {
    id: 3,
    title: "Intro to Node.js",
    content:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is used to build fast and scalable server-side applications.",
  },
  {
    id: 4,
    title: "Mastering CSS Flexbox",
    content:
      "CSS Flexbox is a layout module that allows you to design complex layouts with minimal code. It is perfect for building responsive layouts.",
  },
  {
    id: 5,
    title: "JavaScript Array Methods",
    content:
      "Learn about powerful array methods in JavaScript, such as map(), filter(), and reduce(), and how they can help you write cleaner code.",
  },
  {
    id: 6,
    title: "CSS Grid for Beginners",
    content:
      "CSS Grid is another layout method in CSS. It allows for even more control over complex layouts than Flexbox.",
  },
];

const BlogsList = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Blog List</h2>

        {/* Container for blogs without scroll */}
        <div className="space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold text-blue-700">
                  {blog.title}
                </h3>
                <p className="text-gray-700 mt-2">{blog.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No blogs available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsList;
