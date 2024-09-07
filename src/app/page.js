"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa"; // Qidiruv uchun ikonka

export default function Home() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${query}`
      );
      setUsers(res.data.items);
    } catch (err) {
      setError("Natijalar topilmadi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Qidiruv paneli */}
        <div className="flex items-center mb-6 bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="GitHub foydalanuvchisini qidiring..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            <FaSearch />
          </button>
        </div>

        {/* Natijalarni ko'rsatish */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {loading ? (
            <p>Yuklanmoqda...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  className="mb-4 flex items-center cursor-pointer"
                  onClick={() => router.push(`/user/${user.login}`)}
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-bold">{user.login}</p>
                    <p className="text-gray-500">{user.html_url}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Foydalanuvchilar topilmadi.</p>
          )}
        </div>
      </div>
    </div>
  );
}
