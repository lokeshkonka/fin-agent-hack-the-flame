import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import {
  ShieldCheck,
  Brain,
  Zap,
  Lock,
  LineChart,
  ArrowRight,
  Landmark,
  CreditCard,
  Banknote,
  Shield,
  Building2,
  CheckCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";



type NavLinkProps = {
  href: string;
  label: string;
};

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type IndustryItemProps = {
  icon: LucideIcon;
  label: string;
};

const NavLink = ({ href, label }: NavLinkProps) => (
  <a href={href} className="text-sm opacity-80 hover:opacity-100">
    {label}
  </a>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) => (
  <Card size="3" className="w-85">
    <Flex direction="column" gap="3">
      <Icon className="text-blue-600" />
      <Heading size="4">{title}</Heading>
      <Text size="2" color="gray">
        {description}
      </Text>
    </Flex>
  </Card>
);

const IndustryItem = ({ icon: Icon, label }: IndustryItemProps) => (
  <Card size="1" variant="surface">
    <Flex align="center" gap="2">
      <Icon size={16} />
      <Text size="2">{label}</Text>
    </Flex>
  </Card>
);



const LandingPage = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Card variant="surface">
        <Container size="4">
          <Flex align="center" justify="between" py="4">
            <Flex align="center" gap="2">
              <ShieldCheck />
              <Text weight="bold">SecureBank AI</Text>
            </Flex>

            <Flex gap="5" align="center">
              <NavLink href="#home" label="Home" />
              <NavLink href="#problem" label="Problem" />
              <NavLink href="#solution" label="Solution" />
              <NavLink href="#architecture" label="Architecture" />
              <NavLink href="#feasibility" label="Feasibility" />
              <NavLink href="#value" label="Value" />

              <Link to="/auth">
                <Button>Live Demo</Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Card>

      {/* ================= HERO ================= */}
      <Container size="4" id="home">
        <Flex direction="column" align="center" py="9" gap="5">
          <Text size="2" color="blue">
            Agentic AI • Real-Time Fraud Detection
          </Text>

          <Heading size="8" align="center">
            Autonomous AI for
            <br />
            Digital Banking Fraud Prevention
          </Heading>

          <Text size="4" color="gray" align="center" className="max-w-3xl">
            SecureBank AI is an agentic fraud prevention platform that evaluates
            every transaction in real time using multi-model intelligence,
            behavioral analysis, and explainable risk scoring.
          </Text>

          <Flex gap="4">
            <Link to="/auth">
              <Button size="3">
                Launch Demo <ArrowRight />
              </Button>
            </Link>
            <Button variant="outline" size="3">
              View Architecture
            </Button>
          </Flex>
        </Flex>
      </Container>

      {/* ================= PROBLEM ================= */}
      <Container size="4" id="problem">
        <Flex direction="column" align="center" py="9" gap="6">
          <Heading size="6">The Core Problem</Heading>

          <Text color="gray" align="center" className="max-w-3xl">
            Traditional rule-based fraud systems fail against modern,
            AI-powered attacks. They generate excessive false positives,
            react too slowly, and increase compliance overhead.
          </Text>

          <Flex gap="5" wrap="wrap" justify="center">
            <FeatureCard
              icon={LineChart}
              title="High False Positives"
              description="Static rules frequently block legitimate transactions, degrading user trust and increasing support costs."
            />
            <FeatureCard
              icon={Zap}
              title="Delayed Detection"
              description="Fraud is often identified post-transaction, resulting in financial loss and chargebacks."
            />
            <FeatureCard
              icon={Lock}
              title="Manual Review Bottlenecks"
              description="Compliance teams are overwhelmed by alerts, slowing investigations and audits."
            />
          </Flex>
        </Flex>
      </Container>

      {/* ================= SOLUTION ================= */}
      <Container size="4" id="solution">
        <Flex direction="column" align="center" py="9" gap="6">
          <Heading size="6">Our Agentic AI Solution</Heading>

          <Text color="gray" align="center" className="max-w-3xl">
            SecureBank AI replaces rigid rules with autonomous agents that learn,
            adapt, and explain decisions in real time.
          </Text>

          <Flex gap="5" wrap="wrap" justify="center">
            <FeatureCard
              icon={Brain}
              title="Multi-Model Intelligence"
              description="Combines LSTM, XGBoost, Random Forest, and neural networks through ensemble scoring."
            />
            <FeatureCard
              icon={Zap}
              title="Real-Time Decision Engine"
              description="Approves or freezes transactions instantly before funds leave the system."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Explainable AI"
              description="Every decision includes confidence scores and contributing risk factors."
            />
          </Flex>
        </Flex>
      </Container>

      {/* ================= FEASIBILITY ================= */}
      <Container size="4" id="feasibility">
        <Flex direction="column" align="center" py="9" gap="6">
          <Heading size="6">Feasibility & Viability</Heading>

          <Flex gap="5" wrap="wrap" justify="center">
            <FeatureCard
              icon={CheckCircle}
              title="Technical Feasibility"
              description="Built using proven backend stacks and production-ready ML pipelines with sub-100ms latency."
            />
            <FeatureCard
              icon={CheckCircle}
              title="Operational Feasibility"
              description="Reduces manual fraud reviews and accelerates compliance workflows."
            />
            <FeatureCard
              icon={CheckCircle}
              title="Business Viability"
              description="Supports SaaS, per-transaction pricing, and enterprise licensing models."
            />
          </Flex>
        </Flex>
      </Container>

      {/* ================= VALUE ================= */}
      <Container size="4" id="value">
        <Flex direction="column" align="center" py="9" gap="6">
          <Heading size="6">Business Impact</Heading>

          <Flex gap="5" wrap="wrap" justify="center">
            <FeatureCard
              icon={ShieldCheck}
              title="Fraud Loss Reduction"
              description="Early detection prevents chargebacks and financial exposure."
            />
            <FeatureCard
              icon={Zap}
              title="Zero-Friction User Experience"
              description="Legitimate users experience instant approvals without interruptions."
            />
            <FeatureCard
              icon={LineChart}
              title="Audit & Compliance Ready"
              description="Transparent decision logs support regulatory audits and reporting."
            />
          </Flex>
        </Flex>
      </Container>

      {/* ================= ARCHITECTURE DIAGRAM ================= */}
      <Container size="4" id="architecture">
        <Flex direction="column" align="center" py="9" gap="5">
          <Heading size="5">Technical Architecture Overview</Heading>

          <Text color="gray" align="center" className="max-w-3xl">
            The system follows a real-time, event-driven architecture where
            transactions flow through feature extraction, AI inference,
            explainability, and enforcement layers.
          </Text>

          <Card size="4">
            <img
              src="/tech-diagram.png"
              alt="SecureBank AI Technical Architecture Diagram"
              className="w-full rounded-md"
            />
          </Card>
        </Flex>
      </Container>

      {/* ================= INDUSTRIES ================= */}
      <Container size="4">
        <Flex direction="column" align="center" py="7" gap="5">
          <Heading size="4">Built for the Financial Ecosystem</Heading>

          <Flex gap="4" wrap="wrap" justify="center">
            <IndustryItem icon={Landmark} label="Banks" />
            <IndustryItem icon={CreditCard} label="Fintech Platforms" />
            <IndustryItem icon={Banknote} label="Payment Gateways" />
            <IndustryItem icon={Shield} label="Regulatory Bodies" />
            <IndustryItem icon={Building2} label="Enterprise Risk Teams" />
          </Flex>
        </Flex>
      </Container>

      {/* ================= FOOTER ================= */}
      <Card variant="surface">
        <Container size="4">
          <Flex justify="center" py="4">
            <Text size="1" color="gray">
              © 2025 SecureBank AI — Hackathon Prototype
            </Text>
          </Flex>
        </Container>
      </Card>
    </Flex>
  );
};

export default LandingPage;
