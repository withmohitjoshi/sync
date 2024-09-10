import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Row,
  Column,
  Text,
  Link,
} from "@react-email/components";

const ForgotPasswordTemplate = ({ resetLink }) => {
  return (
    <Html>
      <Head>
        <title>Reset Your Password</title>
      </Head>
      <Preview>Reset your password for Sync</Preview>
      <Body style={main}>
        <Container style={container}>
          <Row>
            <Column>
              <Text style={title}>Forgot Your Password?</Text>
              <Text style={text}>
                No worries! You can reset your password by clicking the link
                below.
              </Text>
              <Text style={text}>
                <Link href={resetLink} style={link}>
                  Reset Password
                </Link>
              </Text>
              <Text style={text}>
                This link will expire in 10 mintues. If you did not request a
                password reset, you can safely ignore this email.
              </Text>
              <Text style={text}>Best regards,</Text>
              <Text style={text}>The Team</Text>
            </Column>
          </Row>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "20px",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const title = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const text = {
  fontSize: "16px",
  marginBottom: "20px",
};

const link = {
  color: "#007bff",
  fontWeight: "bold",
  textDecoration: "none",
};

export default ForgotPasswordTemplate;
