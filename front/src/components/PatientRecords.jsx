import styles from "./PatientRecords.module.css";
import { useEffect, useState } from "react";
import Search from "./Search";
import Button from "./Button";
import TableHeader from "./TableHeader";
import PatientRow from "./PatientRow";
import PatientDetail from "./PatientDetail";
import Modal from "./Modal";

const data = [
  {
    id: 979,
    first_name: "Hill",
    last_name: "Derrick",
    email: "hderrickr6@ycombinator.com",
    gender: "Male",
    date_of_birth: "08/12/1989",
    visit: [
      {
        date: "05/23/2021",
        height: "6-1",
        blood_pressure: "116/70",
        weight: "132lbs",
        symptoms: "Low blood pressure",
        diagnosis:
          "Poisn by mixed bact vaccines w/o a pertuss, slf-hrm, sequela",
      },
    ],
  },
  {
    id: 980,
    first_name: "Pearline",
    last_name: "Senussi",
    email: "psenussir7@statcounter.com",
    gender: "Female",
    date_of_birth: "03/07/1985",
    visit: [
      {
        date: "12/15/2017",
        height: "5-7",
        blood_pressure: "112/74",
        weight: "174lbs",
        symptoms: "Hiccups",
        diagnosis: "Bent bone of right ulna, subs for clos fx w malunion",
      },
    ],
  },
  {
    id: 981,
    first_name: "Roda",
    last_name: "Ginsie",
    email: "rginsier8@123-reg.co.uk",
    gender: "Female",
    date_of_birth: "09/24/2010",
    visit: [
      {
        date: "11/05/2016",
        height: "5-3",
        blood_pressure: "142/92",
        weight: "155lbs",
        symptoms: "Nosebleed",
        diagnosis: "Unspecified transport accident",
      },
    ],
  },
  {
    id: 982,
    first_name: "Babita",
    last_name: "Roget",
    email: "brogetr9@instagram.com",
    gender: "Female",
    date_of_birth: "04/08/1955",
    visit: [
      {
        date: "08/09/2018",
        height: "6-3",
        blood_pressure: "147/95",
        weight: "192lbs",
        symptoms: "Skin lesions",
        diagnosis: "Unsp physeal fracture of lower end of left fibula, sequela",
      },
    ],
  },
  {
    id: 983,
    first_name: "Cristi",
    last_name: "Rodda",
    email: "croddara@usgs.gov",
    gender: "Female",
    date_of_birth: "02/25/1965",
    visit: [
      {
        date: "04/16/2018",
        height: "6-0",
        blood_pressure: "135/87",
        weight: "171lbs",
        symptoms: "Headache",
        diagnosis: "Kaschin-Beck disease, unspecified elbow",
      },
    ],
  },
];

export default function PatientRecords() {
  const [query, setQuery] = useState("");
  const [patientId, setpatientId] = useState(null);
  const [patients, setPatients] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    date_of_birth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function handleSubmit() {
    console.log("Submitted");
  }

  function closeModal() {
    setpatientId(null);
  }

  function selectPatientId(id) {
    console.log(id);
    setpatientId((patientId) => (id === patientId ? null : id));
  }

  function onSetIsModalOpen() {
    setIsModalOpen(() => !isModalOpen);
  }

  return (
    <div className={styles.container}>
      {
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {/* collecting data here */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            <input
              type="text"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              placeholder="12/13/1998"
              required
            />
            <input
              type="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="12"
              required
            />

            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Male/Female/.."
              required
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </Modal>
      }
      {patientId ? (
        <PatientDetail
          closeModal={closeModal}
          patients={patients}
          patientId={patientId}
        />
      ) : (
        <>
          <h2>All Patients Records</h2>
          <div className={styles.patientNav}>
            <Search query={query} setQuery={setQuery} />
            <Button onClick={onSetIsModalOpen} type="patientB">
              Add New Patient
            </Button>
          </div>
          <div className={styles.tableContainer}>
            <TableHeader />

            {patients.map((patient) => (
              <PatientRow
                selectPatientId={selectPatientId}
                first_name={patient.first_name}
                last_name={patient.last_name}
                id={patient.id}
                key={patient.id}
                date_of_birth={patient.date_of_birth}
                gender={patient.gender}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
