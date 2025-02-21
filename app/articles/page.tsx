"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "@/components/ArticleCard";

const fetchArticles = async (category: string) => {
  const res = await fetch(`/api/articles?category=${category}`); 
  if (!res.ok) throw new Error("Failed to fetch articles");

  const jsonData = await res.json();
  console.log("API Response:", jsonData);

  return jsonData ?? [];
};

export default function ArticlesPage() {
    const [category, setCategory] = useState("");
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    const { data, error, isLoading, refetch } = useQuery({
      queryKey: ["articles", category],
      queryFn: () => fetchArticles(category),
      enabled: false,

    });

    const handleSearch = () => {
      setIsSearchClicked(true);
      refetch();
    };

    const articles = Array.isArray(data) ? data : [];

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Articles</h1>
        
        <div className="mb-4 flex gap-2">
          <input type="text" placeholder="Search by category" className="border p-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)}/>
          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Search</button>
        </div>

        {isSearchClicked && isLoading && <p>Loading articles...</p>}
        {isSearchClicked && error && <p className="text-red-500">Error: {error.message}</p>}
        {isSearchClicked && !isLoading && !error && articles.length === 0 && <p>No articles found.</p>}

        {isSearchClicked && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        )}
      </div>
    );
}
