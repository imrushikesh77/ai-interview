import { CheckCircle } from 'lucide-react'

const PricingPlan = ({ name, price, features, recommended }) => (
    <div className={`bg-card p-6 rounded-lg shadow-lg ${recommended ? 'border-2 border-primary' : ''}`}>
      {recommended && (
        <div className="text-primary font-semibold mb-2">Recommended</div>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="text-3xl font-bold mb-4">${price}<span className="text-base font-normal text-muted-foreground">/month</span></div>
      <ul className="mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <CheckCircle className="text-green-500 mr-2" size={16} />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-2 rounded ${recommended ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
        Choose Plan
      </button>
    </div>
  )

export default PricingPlan