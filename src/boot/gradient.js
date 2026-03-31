
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {

  app.mixin({
    methods: {
      getGradientC() {
        const gradients = [

          "linear-gradient(135deg,#60a5fa,#a78bfa)",
          "linear-gradient(135deg,#f87171,#fb7185)",
          "linear-gradient(135deg,#fb923c,#fbbf24)",
          "linear-gradient(135deg,#fbbf24,#a3e635)",
          "linear-gradient(135deg,#4ade80,#34d399)",

          "linear-gradient(135deg,#34d399,#22d3ee)",
          "linear-gradient(135deg,#22d3ee,#38bdf8)",
          "linear-gradient(135deg,#38bdf8,#60a5fa)",
          "linear-gradient(135deg,#60a5fa,#818cf8)",
          "linear-gradient(135deg,#818cf8,#a78bfa)",

          "linear-gradient(135deg,#a78bfa,#c084fc)",
          "linear-gradient(135deg,#c084fc,#e879f9)",
          "linear-gradient(135deg,#e879f9,#fb7185)",
          "linear-gradient(135deg,#fb7185,#f87171)",
          "linear-gradient(135deg,#f87171,#fb923c)",

          "linear-gradient(135deg,#fb923c,#facc15)",
          "linear-gradient(135deg,#facc15,#a3e635)",
          "linear-gradient(135deg,#a3e635,#4ade80)",
          "linear-gradient(135deg,#4ade80,#2dd4bf)",
          "linear-gradient(135deg,#2dd4bf,#22d3ee)",

          "linear-gradient(135deg,#22d3ee,#38bdf8)",
          "linear-gradient(135deg,#38bdf8,#60a5fa)",
          "linear-gradient(135deg,#60a5fa,#818cf8)",
          "linear-gradient(135deg,#818cf8,#a78bfa)",
          "linear-gradient(135deg,#a78bfa,#c084fc)",

          "linear-gradient(135deg,#fb7185,#f472b6)",
          "linear-gradient(135deg,#f472b6,#e879f9)",
          "linear-gradient(135deg,#e879f9,#c084fc)",
          "linear-gradient(135deg,#c084fc,#a78bfa)",
          "linear-gradient(135deg,#a78bfa,#818cf8)",

          "linear-gradient(135deg,#818cf8,#60a5fa)",
          "linear-gradient(135deg,#60a5fa,#38bdf8)",
          "linear-gradient(135deg,#38bdf8,#22d3ee)",
          "linear-gradient(135deg,#22d3ee,#2dd4bf)",
          "linear-gradient(135deg,#2dd4bf,#34d399)",

          "linear-gradient(135deg,#34d399,#4ade80)",
          "linear-gradient(135deg,#4ade80,#a3e635)",
          "linear-gradient(135deg,#a3e635,#facc15)",
          "linear-gradient(135deg,#facc15,#fb923c)",
          "linear-gradient(135deg,#fb923c,#f87171)",

          "linear-gradient(135deg,#f87171,#fb7185)",
          "linear-gradient(135deg,#fb7185,#f472b6)",
          "linear-gradient(135deg,#f472b6,#e879f9)",
          "linear-gradient(135deg,#e879f9,#c084fc)",
          "linear-gradient(135deg,#c084fc,#a78bfa)",

          "linear-gradient(135deg,#a78bfa,#818cf8)",
          "linear-gradient(135deg,#818cf8,#60a5fa)",
          "linear-gradient(135deg,#60a5fa,#38bdf8)",
          "linear-gradient(135deg,#38bdf8,#22d3ee)",
          "linear-gradient(135deg,#22d3ee,#2dd4bf)"

        ];

        return gradients[Math.floor(Math.random() * gradients.length)];

      },
      getGradientA() {

        const gradients = [

          "linear-gradient(135deg,#fde68a,#fbbf24)",
          "linear-gradient(135deg,#fca5a5,#ef4444)",
          "linear-gradient(135deg,#fecaca,#f87171)",
          "linear-gradient(135deg,#fbcfe8,#ec4899)",
          "linear-gradient(135deg,#e9d5ff,#a855f7)",
          "linear-gradient(135deg,#c4b5fd,#6366f1)",
          "linear-gradient(135deg,#bfdbfe,#3b82f6)",
          "linear-gradient(135deg,#a5f3fc,#06b6d4)",
          "linear-gradient(135deg,#99f6e4,#14b8a6)",
          "linear-gradient(135deg,#bbf7d0,#22c55e)",

          "linear-gradient(135deg,#d9f99d,#84cc16)",
          "linear-gradient(135deg,#fde68a,#f59e0b)",
          "linear-gradient(135deg,#fed7aa,#f97316)",
          "linear-gradient(135deg,#fecdd3,#fb7185)",
          "linear-gradient(135deg,#ddd6fe,#8b5cf6)",
          "linear-gradient(135deg,#bae6fd,#0ea5e9)",
          "linear-gradient(135deg,#cffafe,#06b6d4)",
          "linear-gradient(135deg,#dcfce7,#16a34a)",
          "linear-gradient(135deg,#fef9c3,#eab308)",
          "linear-gradient(135deg,#ffe4e6,#f43f5e)",

          "linear-gradient(135deg,#fdf2f8,#db2777)",
          "linear-gradient(135deg,#eef2ff,#4f46e5)",
          "linear-gradient(135deg,#ecfeff,#0891b2)",
          "linear-gradient(135deg,#f0fdf4,#16a34a)",
          "linear-gradient(135deg,#fff7ed,#ea580c)",
          "linear-gradient(135deg,#faf5ff,#9333ea)",
          "linear-gradient(135deg,#fef2f2,#dc2626)",
          "linear-gradient(135deg,#eff6ff,#2563eb)",
          "linear-gradient(135deg,#f0fdfa,#0d9488)",
          "linear-gradient(135deg,#f7fee7,#65a30d)",

          "linear-gradient(135deg,#fefce8,#ca8a04)",
          "linear-gradient(135deg,#fff1f2,#e11d48)",
          "linear-gradient(135deg,#eef2ff,#4338ca)",
          "linear-gradient(135deg,#e0f2fe,#0284c7)",
          "linear-gradient(135deg,#ccfbf1,#0f766e)",
          "linear-gradient(135deg,#dcfce7,#15803d)",
          "linear-gradient(135deg,#fef3c7,#d97706)",
          "linear-gradient(135deg,#ffe4e6,#be123c)",
          "linear-gradient(135deg,#ede9fe,#7c3aed)",
          "linear-gradient(135deg,#e0f7fa,#0891b2)",

          "linear-gradient(135deg,#d1fae5,#059669)",
          "linear-gradient(135deg,#fef9c3,#ca8a04)",
          "linear-gradient(135deg,#fee2e2,#b91c1c)",
          "linear-gradient(135deg,#dbeafe,#1d4ed8)",
          "linear-gradient(135deg,#cffafe,#155e75)",
          "linear-gradient(135deg,#dcfce7,#166534)",
          "linear-gradient(135deg,#ffedd5,#c2410c)",
          "linear-gradient(135deg,#fce7f3,#9d174d)",
          "linear-gradient(135deg,#ede9fe,#5b21b6)",
          "linear-gradient(135deg,#e0f2fe,#0369a1)"

        ]

        return gradients[Math.floor(Math.random() * gradients.length)];
      }
    }
  })
})
