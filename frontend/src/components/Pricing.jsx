import PricingPlan from './PricingPlan'

const Pricing = () => (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingPlan
            name="Basic"
            price={9.99}
            features={[
              "5 AI-generated interviews per month",
              "Basic feedback and analysis",
              "Access to question bank"
            ]}
          />
          <PricingPlan
            name="Pro"
            price={19.99}
            features={[
              "Unlimited AI-generated interviews",
              "Advanced feedback and analysis",
              "Custom interview scenarios",
              "Priority support"
            ]}
            recommended={true}
          />
          <PricingPlan
            name="Enterprise"
            price={49.99}
            features={[
              "All Pro features",
              "Team management",
              "Custom branding",
              "API access",
              "Dedicated account manager"
            ]}
          />
        </div>
      </div>
    </section>
  )

export default Pricing