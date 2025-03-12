const Feature = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )

export default Feature;