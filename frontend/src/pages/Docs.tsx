
import React, { useState, type ReactNode } from 'react';
import { ChevronDown, Home, LogIn, Shield, Zap, GitBranch, Lock, BarChart3, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

// Types
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
}



interface FeatureCard {
  icon: ReactNode;
  title: string;
  description: string;
}

interface ArchitectureComponent {
  name: string;
  description: string;
  role: string;
}

const Docs: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [expandedArch, setExpandedArch] = useState<string | null>(null);

  // Navigation items
  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', href: '#overview', icon: <Shield className="w-4 h-4" /> },
    { id: 'problem', label: 'The Problem', href: '#problem', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'solution', label: 'Our Solution', href: '#solution', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'architecture', label: 'Architecture', href: '#architecture', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'features', label: 'Key Features', href: '#features', icon: <Zap className="w-4 h-4" /> },
    { id: 'technology', label: 'Tech Stack', href: '#technology', icon: <Lock className="w-4 h-4" /> },
    { id: 'ml-pipeline', label: 'ML Pipeline', href: '#ml-pipeline', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'integration', label: 'Integration Guide', href: '#integration', icon: <ArrowRight className="w-4 h-4" /> },
  ];

  // Feature cards data
  const features: FeatureCard[] = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: 'Real-Time Detection',
      description: 'Detects fraud in under 100ms, before transaction processing. Instantly identifies anomalies, reducing fraud exposure to near zero.',
    },
    {
      icon: <GitBranch className="w-6 h-6 text-blue-600" />,
      title: 'Ensemble ML Engine',
      description: 'Multi-model architecture with stacking ensures high accuracy, adapts to new fraud patterns, and avoids single points of failure.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      title: 'Advanced Analytics',
      description: 'Detects behavioral deviations—velocity, geography, timing, new beneficiaries—learning continuously to catch zero-day fraud.',
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      title: 'Transparent Decisions',
      description: 'Confidence scores, risk factors, and feature triggers support audits and build user trust with explainable AI.',
    },
  ];

  // Architecture components
  const architectureComponents: ArchitectureComponent[] = [
    {
      name: 'API Gateway',
      description: 'FastAPI & SpringBoot services handling incoming transaction requests with input validation and session management.',
      role: 'Request Router & Load Balancer',
    },
    {
      name: 'Fraud Detection Engine',
      description: 'Core processing unit running ensemble models for real-time fraud scoring with <100ms latency.',
      role: 'Decision Maker',
    },
    {
      name: 'Ensemble Models',
      description: 'LSTM, XGBoost, Random Forest, and Neural Networks with meta-learner stacking for optimal accuracy.',
      role: 'Predictive Layer',
    },
    {
      name: 'Data Layer',
      description: 'PostgreSQL (Supabase) storing user profiles, transaction history, behavioral data, and real-time streams.',
      role: 'Data Persistence',
    },
  ];

  // Render section content
  const renderSectionContent = (): ReactNode => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-linear-to-br from-blue-50 to-white p-8 rounded-lg border border-blue-100">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">SecureBank: Agentic AI Fraud Detection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                SecureBank is an enterprise-grade fraud detection platform powered by agentic AI and machine learning. 
                We provide real-time prevention with zero friction, protecting financial institutions from evolving fraud threats 
                while maintaining seamless user experience.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">100ms</div>
                  <div className="text-sm text-gray-600">Detection Latency</div>
                </div>
                <div className="bg-white p-4 rounded border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">60%</div>
                  <div className="text-sm text-gray-600">Fraud Reduction</div>
                </div>
                <div className="bg-white p-4 rounded border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">$41B+</div>
                  <div className="text-sm text-gray-600">Annual Market</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'problem':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-2xl font-bold text-red-900 mb-4">The Challenge</h3>
              <p className="text-gray-700 mb-4">
                Modern banking faces an asymmetric threat landscape where fraudsters leverage AI and machine learning 
                to evolve attack patterns faster than traditional detection systems can adapt.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300">
                <AlertCircle className="w-8 h-8 text-red-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Real World Impact</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Fraudsters operate milliseconds ahead of legacy systems</li>
                  <li>• Banks absorb chargebacks, fines, and regulatory penalties</li>
                  <li>• Customers lose trust when legitimate transactions are blocked</li>
                  <li>• Compliance teams overwhelmed with manual alert reviews</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <Shield className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Market Gaps</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Lack of AI production integration skills (60% shortage)</li>
                  <li>• Need for real-time processing capabilities</li>
                  <li>• User transparency and explainability required</li>
                  <li>• Regulatory compliance demands increasing</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'solution':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">How SecureBank Works</h3>
              <p className="text-gray-700 mb-6">
                Our solution combines ensemble machine learning with autonomous decision-making to deliver 
                real-time fraud detection that's both accurate and explainable.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start bg-white p-4 rounded border border-blue-100">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Feature Extraction</h4>
                    <p className="text-sm text-gray-600">Extract rich features: amount, velocity, geolocation, device fingerprint, behavioral patterns</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white p-4 rounded border border-blue-100">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900">AI/ML Model Evaluation</h4>
                    <p className="text-sm text-gray-600">Process through ensemble of LSTM, XGBoost, Random Forest, and Neural Networks</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white p-4 rounded border border-blue-100">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Meta-Learner Stacking</h4>
                    <p className="text-sm text-gray-600">Combine model predictions using meta-learner for optimal accuracy and robustness</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white p-4 rounded border border-blue-100">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Decision Engine</h4>
                    <p className="text-sm text-gray-600">Autonomous decision making: Approve legitimate, Freeze suspicious, with explanation</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-white p-4 rounded border border-blue-100">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="font-bold text-gray-900">User Feedback Loop</h4>
                    <p className="text-sm text-gray-600">Collect user feedback and continuously update models for adaptation to new fraud patterns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">System Architecture</h3>
              <p className="text-gray-700 mb-6">
                SecureBank follows a layered microservices architecture designed for scalability, real-time processing, and reliability.
              </p>

              <div className="space-y-3">
                {architectureComponents.map((component, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-all duration-300"
                  >
                    <button
                      onClick={() => setExpandedArch(expandedArch === component.name ? null : component.name)}
                      className="w-full px-6 py-4 bg-linear-to-r from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 flex items-center justify-between transition-all duration-300"
                    >
                      <div className="text-left">
                        <h4 className="font-bold text-gray-900">{component.name}</h4>
                        <p className="text-sm text-blue-600">{component.role}</p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          expandedArch === component.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedArch === component.name && (
                      <div className="px-6 py-4 bg-white border-t border-gray-200 text-gray-700">
                        {component.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3">Data Flow</h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center">
                    <div className="font-bold text-blue-600">Transaction</div>
                    <div className="text-xs text-gray-600">Initiated</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <div className="text-center">
                    <div className="font-bold text-blue-600">Validation</div>
                    <div className="text-xs text-gray-600">Input Check</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <div className="text-center">
                    <div className="font-bold text-blue-600">Feature Extraction</div>
                    <div className="text-xs text-gray-600">ML Ready</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <div className="text-center">
                    <div className="font-bold text-blue-600">Decision</div>
                    <div className="text-xs text-gray-600">Approved/Frozen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Key Features</h3>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  onClick={() => setExpandedFeature(expandedFeature === feature.title ? null : feature.title)}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-1">{feature.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                      <p className={`text-sm text-gray-700 transition-all duration-300 ${
                        expandedFeature === feature.title ? 'max-h-96' : 'max-h-20 overflow-hidden'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'technology':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology Stack</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-4">Frontend</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Vite + React 18
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    TypeScript for type safety
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Tailwind CSS for styling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Lucide Icons for UI
                  </li>
                </ul>
              </div>

              <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-4">Backend</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    FastAPI for API Gateway
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Spring Boot for Services
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Real-time Event Streaming
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Security & Auth Libraries
                  </li>
                </ul>
              </div>

              <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-4">ML Pipeline</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    LSTM Networks for sequences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    XGBoost for structured data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Random Forest for robustness
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Neural Networks for depth
                  </li>
                </ul>
              </div>

              <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-4">Data Layer</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    PostgreSQL (Supabase)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Real-time Transaction Streams
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Historical Data Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    Behavioral Analytics DB
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'ml-pipeline':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">ML Pipeline & Model Ensemble</h3>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
              <h4 className="font-bold text-gray-900 mb-3">Multi-Model Ensemble Architecture</h4>
              <p className="text-gray-700 mb-4">
                Our ensemble approach leverages four specialized models with meta-learner stacking for optimal performance:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">①</span> LSTM Networks
                </h5>
                <p className="text-sm text-gray-700">Captures temporal patterns and sequential transaction behavior for behavioral anomaly detection</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">②</span> XGBoost
                </h5>
                <p className="text-sm text-gray-700">linear boosting for structured features with high interpretability and fast inference</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">③</span> Random Forest
                </h5>
                <p className="text-sm text-gray-700">Ensemble of decision trees providing robust predictions and feature importance rankings</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
                <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">④</span> Neural Networks
                </h5>
                <p className="text-sm text-gray-700">Deep learning for complex non-linear patterns and high-dimensional feature interactions</p>
              </div>
            </div>

            <div className="bg-linear-to-r from-blue-50 to-white p-6 rounded-lg border border-blue-200 mt-6">
              <h4 className="font-bold text-gray-900 mb-4">Meta-Learner Stacking</h4>
              <p className="text-gray-700 mb-4">
                The meta-learner combines predictions from all base models using a weighted ensemble approach:
              </p>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3 bg-white p-3 rounded border border-blue-100">
                  <span className="font-bold text-blue-600 shrink-0">1.</span>
                  <span>Base models evaluate transaction independently with confidence scores</span>
                </div>
                <div className="flex items-start gap-3 bg-white p-3 rounded border border-blue-100">
                  <span className="font-bold text-blue-600 shrink-0">2.</span>
                  <span>Meta-learner receives predictions and confidence from all 4 base models</span>
                </div>
                <div className="flex items-start gap-3 bg-white p-3 rounded border border-blue-100">
                  <span className="font-bold text-blue-600 shrink-0">3.</span>
                  <span>Weighted averaging produces final fraud probability with optimal accuracy</span>
                </div>
                <div className="flex items-start gap-3 bg-white p-3 rounded border border-blue-100">
                  <span className="font-bold text-blue-600 shrink-0">4.</span>
                  <span>System returns explainable decision with risk factors and contributing models</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4">Feature Engineering</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <h5 className="font-semibold text-gray-900 mb-2 text-sm">Transaction Features</h5>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Amount</li>
                    <li>• Currency</li>
                    <li>• Time of day</li>
                    <li>• Frequency</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <h5 className="font-semibold text-gray-900 mb-2 text-sm">Behavioral Features</h5>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Velocity (time-based)</li>
                    <li>• Geography deviation</li>
                    <li>• Device fingerprint</li>
                    <li>• User patterns</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <h5 className="font-semibold text-gray-900 mb-2 text-sm">Network Features</h5>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Beneficiary history</li>
                    <li>• New recipient risk</li>
                    <li>• Transaction graph</li>
                    <li>• Anomaly scores</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integration':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Integration Guide</h3>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
              <h4 className="font-bold text-gray-900 mb-3">API Integration Steps</h4>
              <p className="text-gray-700">
                Integrate SecureBank fraud detection into your banking platform with minimal friction.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">1. Authentication</h4>
                <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                  <pre className="text-gray-800">{`POST /auth/api-key
Authorization: Bearer YOUR_TOKEN
{
  "client_id": "your_bank_id",
  "client_secret": "your_secret"
}

Response:
{
  "api_key": "sk_live_xxxxx",
  "expires_in": 3600
}`}</pre>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">2. Transaction Evaluation</h4>
                <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                  <pre className="text-gray-800">{`POST /api/v1/evaluate
Authorization: Bearer sk_live_xxxxx
Content-Type: application/json
{
  "transaction_id": "txn_123",
  "amount": 5000.00,
  "currency": "USD",
  "user_id": "user_456",
  "recipient_id": "user_789",
  "device_id": "dev_abc123",
  "ip_address": "192.168.1.1",
  "timestamp": "2025-12-17T16:30:00Z"
}

Response:
{
  "prediction": 0,
  "probability": 0.019,
  "risk_level": "LOW",
  "decision": "APPROVE",
  "confidence_scores": {
    "lstm": 0.05,
    "xgboost": 0.10,
    "random_forest": 0.42,
    "neural_network": 0.01
  },
  "risk_factors": [
    "Unusual time of day",
    "New beneficiary"
  ],
  "processing_time_ms": 87
}`}</pre>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">3. Handle Response</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <span className="font-bold text-green-900">APPROVE:</span>
                    <span className="text-gray-700 ml-2">Process transaction normally</span>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <span className="font-bold text-yellow-900">REVIEW:</span>
                    <span className="text-gray-700 ml-2">Flag for manual review by compliance team</span>
                  </div>
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <span className="font-bold text-red-900">FREEZE:</span>
                    <span className="text-gray-700 ml-2">Block transaction and notify user immediately</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">4. Feedback Loop</h4>
                <p className="text-gray-700 mb-3 text-sm">
                  Send feedback on fraud decisions to help model improve over time:
                </p>
                <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                  <pre className="text-gray-800">{`POST /api/v1/feedback
Authorization: Bearer sk_live_xxxxx
{
  "transaction_id": "txn_123",
  "actual_fraud": false,
  "reason": "Legitimate transaction",
  "timestamp": "2025-12-17T16:35:00Z"
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-blue-200 bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
          <img src="/icon.svg" alt="SecureBank AI" className="h-7 w-7" />
          <span className="text-lg font-semibold text-slate-950">
            SecureBank AI
          </span>
        </div>
          <div className="flex items-center gap-3">
            <a href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm hover:underline">Home</span>
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-sm font-semibold text-blue-600">Documentation</span>
          </div>

          <a 
            href="/auth"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            <LogIn className="w-4 h-4" />
            Get Started
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Navigation</div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-900'
                  }`}
                >
                  <span className={`w-4 h-4 shrink-0 ${activeSection === item.id ? 'text-white' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 min-h-96">
              <div className="animate-fade-in">
                {renderSectionContent()}
              </div>
            </div>

            {/* Additional Info Footer */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Enterprise Grade</h4>
                <p className="text-xs text-gray-700">Security-first architecture with compliance ready</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Lightning Fast</h4>
                <p className="text-xs text-gray-700">Sub-100ms decisions for seamless experience</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all">
                <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Always Learning</h4>
                <p className="text-xs text-gray-700">Continuous model improvement via feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-linear-to-r from-blue-50 to-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-700 mb-2">SecureBank Documentation</p>
          <p className="text-sm text-gray-500">Agentic AI Fraud Detection for Modern Banking | Team Meticura</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-600">
            <span>© 2025 SecureBank</span>
            <span>•</span>
            <span>Enterprise Fraud Detection</span>
            <span>•</span>
            <span>Real-Time Processing</span>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Focus styles for accessibility */
        button:focus-visible {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }

        /* Smooth transitions */
        * {
          transition: background-color 150ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 150ms cubic-bezier(0.16, 1, 0.3, 1),
                      color 150ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        input,
        select,
        textarea,
        button {
          transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default Docs;
