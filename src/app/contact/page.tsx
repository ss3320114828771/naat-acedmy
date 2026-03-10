export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-5xl font-bold text-center text-white glow-text">
        Contact Us
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-pink-300 mb-6">Get in Touch</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-pink-500 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-pink-500 outline-none"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-pink-500 outline-none"
            ></textarea>
            <button className="button-glow w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">Contact Information</h3>
            <div className="space-y-3 text-white">
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ info@naatacademy.com</p>
              <p>📍 123 Islamic Center Street, NY 10001</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-green-300 mb-4">Business Hours</h3>
            <div className="space-y-2 text-white">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}