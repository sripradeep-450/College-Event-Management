import {
  useEffect,
  useState
} from "react";

import API from "../services/api";
import Layout from "../components/Layout";

function Certificates() {

  const [
    certificates,
    setCertificates
  ] = useState([]);

  useEffect(() => {

    fetchCertificates();

  }, []);

  const fetchCertificates =
    async () => {

      try {

        const student =
          JSON.parse(
            localStorage.getItem(
              "student"
            )
          );

        const res =
          await API.get(
            `/certificates/student/${student._id}`
          );

        setCertificates(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <div
        className="events-page"
      >

        <h1>
          My Certificates
        </h1>

        {
          certificates.map(
            (certificate) => (

              <div
                key={certificate._id}
                className="certificate-card"
              >

                <div className="certificate-header">

                  <h2>
                    🏆 {
                      certificate.eventId
                        ?.eventName
                    }
                  </h2>

                  <span
                    className="certificate-badge"
                  >
                    Issued
                  </span>

                </div>

                <p>
                  <strong>
                    Certificate No:
                  </strong>
                  {" "}
                  {
                    certificate
                      .certificateNumber
                  }
                </p>

                <p>
                  <strong>
                    Issue Date:
                  </strong>
                  {" "}
                  {
                    new Date(
                      certificate.createdAt
                    ).toLocaleDateString()
                  }
                </p>

                <div
                  className="certificate-actions"
                >

                  <button
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/certificates-files/${certificate.pdfPath.split("/").pop()}`,
                        "_blank"
                      )
                    }
                  >
                    Download
                  </button>

                </div>

              </div>

            )
          )
        }

      </div>

    </Layout>

  );
}

export default Certificates;