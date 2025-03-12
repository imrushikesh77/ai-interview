const Testimonial = ({ quote, author, role }) => (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <p className="italic mb-4">&quot;{quote}&quot;</p>
      <div className="font-semibold">{author}</div>
      <div className="text-sm text-muted-foreground">{role}</div>
    </div>
  )

export default Testimonial
