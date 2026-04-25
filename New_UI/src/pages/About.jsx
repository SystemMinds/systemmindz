export default function About() {
  return (
    <section className="section pt-32">
      <div className="container-custom max-w-3xl">
        <span className="badge-secondary mb-6">About</span>
        <h1 className="heading-xl mb-6">
          About <span className="text-gradient">New UI</span>
        </h1>
        <p className="text-dark-400 text-lg leading-relaxed mb-6">
          New UI is a modern React starter built with Vite, Tailwind CSS, and React Router.
          It provides a clean, scalable folder structure and a rich component library to
          help you ship faster.
        </p>
        <p className="text-dark-400 leading-relaxed">
          Use this as your starting point and extend it with your own components, pages,
          and business logic.
        </p>
      </div>
    </section>
  )
}
