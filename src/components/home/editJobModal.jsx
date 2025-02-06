import { useState, useEffect } from "react";

import { addUsersJobApplication } from "../../firebase/database";

export default function EditJobToList({setModalClose,job}) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [location, setLocation] = useState("");
  const [importance, setImportance] = useState("");
  const [jobLink, setJobLink] = useState("");

  const [testilista, setTestilista] = useState([]);

  const hakemus = {
    jobTitle,
    company,
    dateApplied,
    location,
    importance,
    jobLink,
  };

  useEffect(() => {
    if (job) {
        console.log("LÖYTY JOB")
      setJobTitle(job.jobTitle || "");
      setCompany(job.company || "");
      setDateApplied(job.dateApplied || "");
      setLocation(job.location || "");
      setImportance(job.importance || "");
      setJobLink(job.jobLink || "");
    }
    console.log("EI JOB")
  }, [job]);

  const handleAdd = () => {
    const hakemus = {
      jobTitle,
      company,
      dateApplied,
      location,
      importance,
      jobLink,
    };

    if (job) {
      updateJobApplication(job.id, hakemus); // updateJobApplication on funktio joka päivittää tietokannan
    } else {
      // Jos job ei ole olemassa, lisätään uusi
      addUsersJobApplication(hakemus);
    }
    setModalClose(); 
  };



  useEffect(() => {
    console.log(testilista + "listaaa");
  }, [testilista]);

  return (
    <div className="flex mt-10 justify-center">
        <div
          className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center "
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-xl mb-4">Muokkaa hakemusta</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Haettu paikka
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                  placeholder="Enter job title"
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-700">
                  Firma
                </label>
                <input
                  type="text"
                  value={company}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                  placeholder="Enter company"
                  onChange={(e) => setCompany(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-700">
                  Millon haettu
                </label>
                <input
                  type="text"
                  value={dateApplied}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                  placeholder="Päivämäärä tai jotai"
                  onChange={(e) => setDateApplied(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-700">
                  Sijainti
                </label>
                <input
                  type="text"
                  value={location}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                  placeholder="Etänä/Helsnki/Espoo..."
                  onChange={(e) => setLocation(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-700">
                  Tärkeys
                </label>
                <input
                  type="text"
                  value={importance}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                  placeholder="Kuinka tärkeä paikka on"
                  onChange={(e) => setImportance(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-700">
                  Linkki työilmoitukseen
                </label>
                <input
                  type="text"
                value={jobLink}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                  placeholder="duunitori.fi/......"
                  onChange={(e) => setJobLink(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={setModalClose}
                >
                  Peruuta
                </button>
                <button
                  onClick={handleAdd}
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Muokkaa hakemusta
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}
