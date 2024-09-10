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
} from "@react-email/components";

const VerifyEmailOTPTemplate = ({ otp, username }) => {
  return (
    <Html>
      <Head>
        <title>Verify Your Email</title>
      </Head>
      <Preview>Verify your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Row>
            <Column>
              <Text style={title}>Welcome @{username}</Text>
              <Text style={text}>
                Welcome to our platform Sync! Please verify your email address
                using the OTP below.
              </Text>
              <Text style={{ ...otpText, textAlign: "center" }}>{otp}</Text>
              <Text style={text}>
                If you did not request this, please ignore this email.
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

const otpText = {
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "20px",
};
export default VerifyEmailOTPTemplate;
