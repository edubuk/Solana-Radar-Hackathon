# Solana-Radar-Hackathon (Sept. - Oct. 2024)

## Frontend code of Edubuk's dApp integrated with Solana Blockchain (Devnet)

Edubuk makes credentials verification and background checks secure, efficient, cost-effective, and fraud-free using AI & Blockchain Technology. Since launch, Edubuk has recorded 20,000+ certificates on the blockchain, has secured partnerships with 15 universities and third party background verification companies. Globally recognized with 40+ awards on merit, including Best Edtech Startup in G20 Conference, and media recognition from CNBC, CNN, Forbes, Economic Times and Grants from major Blockchains, Edubuk has build on Solana chain now as we prepare to Launch as a part of Singapore based Tenity's accelerator program. We are setting new standards in the credentials & background verification industry, globally.

Whitepaper, Pitchdeck and One-Pager: https://drive.google.com/drive/folders/1fA-XGaz3OWDLDFFHLfqSbEGPv3xvEAAq?usp=sharing

**There are 4 stakeholders as mentioned in the diagram below:**

1.) Issuer: University or Employer who issues the academic certificate or Work-Experience certificate.

2.) Holder: Student or Employee with whom this certificate resides.

3.) Verifier: Other Universities or Other Employers who directly wish to check the authenticity of the credential of the student on the blockchain.

4.) Requestor: Third party background verification companies: These companies request the candidate to share their digitally verified certificate stored on the blockchain with them for verification purposes.

![image](https://github.com/user-attachments/assets/60901a8b-143c-41e6-947c-aa77b627f4cb)

**This project includes a decentralized application (dApp) for recording and verifying certificates on the Solana blockchain. The dApp has two main components:**

**1. e-Sealing**

The e-Sealing Tab allows users to register certificates on the blockchain by signing the transaction using a Web3 wallet. When registering a certificate:
Metadata Fields: Users provide three metadata fields:
Certificate Issued To: The beneficiary of the certificate.
Certificate Issued By: The issuing authority.
Certificate Type: Description of the certificate.
Upload Certificate: Users upload a digital copy of the certificate from their local computer.
Register File Hash: Clicking "Register File Hash" generates a cryptographic hash of the file and creates a transaction on the blockchain. This process records six fields:
Beneficiary
Certifying Authority
Certificate Details
Unique file hash (cryptographic)
Timestamp (when the certificate was recorded in UTC)
Witness (certifying authority's wallet address)

**2. Verification**
The Verification Tab allows users to upload a digital certificate and click "Verify Certificate." The dApp retrieves the six fields from the blockchain to verify the information. If all fields match, it displays a "Certificate Verified" message. If the certificate has been tampered with or was not registered on the chain, it shows "Error! Certificate Not Verified."

**Use Cases**
This dApp has various applications requiring immutable and verifiable records of certification, such as:
**Educational Credentials
Professional Licenses
Authenticity Certificates for Digital or Physical Assets**
