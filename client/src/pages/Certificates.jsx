import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Certificates() {
  const [
    certificateNumber,
    setCertificateNumber,
  ] = useState("");

  const [
    certificate,
    setCertificate,
  ] = useState(null);

  const verifyCertificate =
    async () => {
      try {
        const res =
          await API.get(
            `/certificates/verify/${certificateNumber}`
          );

        setCertificate(
          res.data.certificate
        );
      } catch (error) {
        alert(
          "Certificate Not Found"
        );
      }
    };

  return (
    <Layout>
      <div className="events-page">
        <h1>
          Certificate Verification
        </h1>

      <input
        className="search-box"
        placeholder="Certificate Number"
        value={
          certificateNumber
        }
        onChange={(e) =>
          setCertificateNumber(
            e.target.value
          )
        }
      />

      <button
        onClick={
          verifyCertificate
        }
      >
        Verify
      </button>

      {certificate && (
        <div
          className="event-card"
          style={{
            marginTop:
              "20px",
          }}
        >
          <h2>
            Certificate
            Verified
          </h2>

          <p>
            Student:
            {
              certificate
                .studentId
                ?.name
            }
          </p>

          <p>
            Event:
            {
              certificate
                .eventId
                ?.eventName
            }
          </p>

          <p>
            Certificate:
            {
              certificate.certificateNumber
            }
          </p>
        </div>
      )}
    </div>
    </Layout>
  );
}

export default Certificates;