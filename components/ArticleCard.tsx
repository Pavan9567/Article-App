import React from "react";

interface ArticleProps {
  id: string;
  title: string;
  url: string;
  category: string;
  createdAt: string;
}

const ArticleCard: React.FC<ArticleProps> = ({ title, url, category, createdAt }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-600">Category: <span className="font-medium text-blue-600">{category}</span></p>
      <p className="text-sm text-gray-500">Published: {new Date(createdAt).toLocaleDateString()}</p><br/>
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-all">Read More</a>
    </div>
  );
};

export default ArticleCard;
