"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { notFound, useRouter } from "next/navigation";
import { FaArrowLeft, FaGithub } from "react-icons/fa";

export default function User({ params }) {
  const { username } = params;
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUser(userRes.data);

        const reposRes = await axios.get(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
        );
        setRepos(reposRes.data);
      } catch (err) {
        setError("Foydalanuvchi topilmadi");
      }
    };
    fetchUser();
  }, [username]);

  if (error) return notFound();
  if (!user) return <p>Yuklanmoqda...</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-blue-500 mr-4"
          >
            <FaArrowLeft className="mr-2" /> Orqaga
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">{user.name || user.login}</h1>
          <p className="text-gray-700 text-center mb-4">
            {user.bio || "Bio mavjud emas"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <strong>Location:</strong> {user.location || "Ma'lumot yo'q"}
          </div>
          <div>
            <strong>Followers:</strong> {user.followers}
          </div>
          <div>
            <strong>Following:</strong> {user.following}
          </div>
          <div>
            <strong>Public Repos:</strong> {user.public_repos}
          </div>
          <div>
            <strong>Company:</strong> {user.company || "Ma'lumot yo'q"}
          </div>
          <div>
            <strong>Blog:</strong>{" "}
            <a
              href={user.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {user.blog || "Ma'lumot yo'q"}
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Oxirgi Yuklangan Repositories
          </h2>
          {repos.length > 0 ? (
            <ul>
              {repos.map((repo) => (
                <li key={repo.id} className="mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {repo.name}
                  </a>{" "}
                  - {repo.description || "Tavsif mavjud emas"}
                </li>
              ))}
            </ul>
          ) : (
            <p>Repositorylar mavjud emas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
