import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-hover bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden">
      <div className="relative h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-2xl text-green-400 font-bold mb-4">${product.price}</p>
        <button className="button-glow w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  )
}