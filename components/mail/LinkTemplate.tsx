import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  const main = {
    backgroundColor: '#ffffff',
    color: '#24292e',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
  };
  
  const container = {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '20px 0 48px',
  };
  
  const title = {
    fontSize: '24px',
    lineHeight: 1.25,
  };
  
  const section = {
    padding: '24px',
    border: 'solid 1px #dedede',
    borderRadius: '5px',
    textAlign: 'center' as const,
  };
  
  const text = {
    margin: '0 0 10px 0',
    textAlign: 'left' as const,
  };
  
  const button = {
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: '#fff',
    lineHeight: 1.5,
    borderRadius: '0.5em',
    padding: '12px 24px',
  };
  
  const links = {
    textAlign: 'center' as const,
  };
  
  const link = {
    color: '#0366d6',
    fontSize: '12px',
  };
  
  const footer = {
    color: '#6a737d',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '60px',
  };
  

interface EmailVerificationTokenProps {
    email: string;
    href : string ;
    
  }
  
  

  
export const EmailVerificationToken = ({
    email,
    href
  }: EmailVerificationTokenProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          A fine-grained email verification token has been linked to your account
        </Preview>
        <Container style={container}>
          
  
          <Text style={title}>
            <strong>@{email}</strong>, Lets get your account up and running.
          </Text>
  
          <Section style={section}>
            <Text style={text}>
              Hey !
            </Text>
            <Text style={text}>
                A fine-grained email verification token has been linked to your account
            </Text>
  
            <Button style={button} href={href}>Verify your email</Button>
          </Section>
          <Text style={links}>
            <Link style={link}>Your security audit log</Link> ・{' '}
            <Link style={link}>Contact support</Link>
          </Text>
  
          <Text style={footer}>
            Maniacal AI @ 2025
          </Text>
        </Container>
      </Body>
    </Html>
  );
  

  

  export const ReceiptEmail = ({
    email,
    href
  }: EmailVerificationTokenProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          Thank you for supporting us !
        </Preview>
        <Container style={container}>
          
  
          <Text style={title}>
            <strong>@{email}</strong>, thank you for your purchase. 
          </Text>
  
          <Section style={section}>
            <Text style={text}>
              Heya !
            </Text>
            <Text style={text}>
                here is your receipt . Thank you for supporting us !
            </Text>
  
            <Button style={button} href={href}>View Receipt</Button>
          </Section>
          <Text style={links}>
            <Link style={link}>Your security audit log</Link> ・{' '}
            <Link style={link}>Contact support</Link>
          </Text>
  
          <Text style={footer}>
            Maniacal AI @ 2025
          </Text>
        </Container>
      </Body>
    </Html>
  );
  