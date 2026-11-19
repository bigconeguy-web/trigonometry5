import React, { useState } from 'react';
import { ArrowLeft, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

interface EmergencyLectureOverlayProps {
  onDismiss: () => void;
  lecturePreset?: string;
}

export const EmergencyLectureOverlay: React.FC<EmergencyLectureOverlayProps> = ({
  onDismiss,
  lecturePreset = 'biology',
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'readings' | 'syllabus'>('notes');

  const getLectureDetails = () => {
    switch (lecturePreset) {
      case 'calculus':
        return {
          code: 'MATH 2940: Multivariable Calculus & Tensor Analysis',
          dept: 'Department of Mathematics · Spring Term',
          lec: 'Lecture 19 · Prof. K. F. Gauss',
          title: "Stokes' Theorem, Green's Identities & Differential 2-Forms",
          topic: "Stokes' Circulation",
          netYield: 'Flux = Circulation Integral',
          formula: '∮_∂S F · dr = ∬_S (∇ × F) · dS',
          coreQ: "How does the curl of a smooth vector field across an oriented 2-surface S relate to the line integral around boundary curve ∂S?",
          keywords: ["• Exterior derivative dω", "• Orientable 2-manifold S", "• Surface normal vector n", "• Path boundary orientation ∂S", "• Conservative gradient fields"],
          thermo: "Line integral of curl-free irrotational vector fields is identically zero across closed simple loops.",
          p1Title: "1. Phase I: Stokes' Fundamental Circulation Formulation",
          p1Text: "Let S be a piecewise-smooth oriented surface bounded by a closed, simple, positively oriented boundary curve C = ∂S. If F is a vector field with continuous partial derivatives in an open domain containing S, the circulation around ∂S equals surface flux of the curl.",
          p1Formula: "∬_S (curl F) · dS = ∮_C F · dr = ∮_C (P dx + Q dy + R dz)",
          p2Title: "2. Phase II: Reduction to Green's Theorem in the Plane",
          p2Text: "When surface S lies entirely planar in the xy-plane with unit normal vector k, the curl simplifies directly to (∂Q/∂x - ∂P/∂y)k, yielding the classical two-dimensional Green's theorem.",
          p3Title: "3. Phase III: Physical Interpretation & Vorticity Fields",
          p3Text: "In fluid dynamics and electromagnetism (Maxwell's Faraday law ∇ × E = -∂B/∂t), the circulation represents induced electromotive force around macroscopic circuit paths.",
          summary: "Stokes' theorem establishes a profound topological bridge between exterior calculus in dimension n and boundary integrals in dimension n-1.",
          book1: "Calculus on Manifolds (Spivak) · Chapter 4: Integration on Chains & Stokes' Generalization.",
          book2: "Vector Calculus (Colley, 4th Ed.) · Chapter 7: Vector Analysis Integrals.",
          check1: "Verify surface orientation consistency using the right-hand rule across parametrized boundary contours.",
          check2: "Compute surface curl integrals using both Cartesian parametrization and cylindrical coordinates.",
          check3: "Demonstrate path independence for simply connected vector fields where ∇ × F = 0."
        };

      case 'physics':
        return {
          code: 'PHYS 3318: Quantum Mechanics & Wave Dynamics',
          dept: 'Department of Applied Physics · Spring Term',
          lec: 'Lecture 22 · Dr. E. Schrödinger',
          title: "Time-Independent Schrödinger Equation & Quantum Harmonic Wells",
          topic: "Hermitian Operators",
          netYield: 'E_n = ℏω(n + 1/2)',
          formula: 'Ĥ|ψ⟩ = E|ψ⟩ ; [x̂, p̂] = iℏ',
          coreQ: "How do boundary constraints on the probability density |ψ(x)|² discretize permissible eigenvalue energy spectra?",
          keywords: ["• Hamiltonian Operator Ĥ", "• Ladder operators (a, a†)", "• Wavefunction normalization ∫|ψ|²dx = 1", "• Heisenberg Uncertainty Principle", "• Quantum tunneling probability"],
          thermo: "Zero-point ground state energy E_0 = 1/2 ℏω emerges strictly from non-commutative operator algebra.",
          p1Title: "1. Phase I: The Infinite Square Potential Well",
          p1Text: "A particle of mass m confined within boundary [0, L] with infinite potential walls experiences spatial standing wave solutions with quantized wavenumbers k_n = nπ / L.",
          p1Formula: "ψ_n(x) = √(2/L) sin(nπx / L),   E_n = (n² π² ℏ²) / (2 m L²)",
          p2Title: "2. Phase II: Quantum Harmonic Oscillator & Operator Algebra",
          p2Text: "Introducing dimensionless annihilation and creation operators a and a† decouples the differential Hamiltonian into harmonic ladder states, guaranteeing discrete equidistant energy quanta ℏω.",
          p3Title: "3. Phase III: Born Probability Density & Measurement Collapse",
          p3Text: "The expectation value ⟨A⟩ = ⟨ψ|Â|ψ⟩ characterizes macroscopic statistical ensembles upon projection onto an eigenbasis.",
          summary: "Eigenvalues of self-adjoint operators represent strictly real measurable observables in Hilbert space.",
          book1: "Introduction to Quantum Mechanics (Griffiths & Schroeter, 3rd Ed.) · Chapter 2: Time-Independent Potentials.",
          book2: "Principles of Quantum Mechanics (Shankar, 2nd Ed.) · Chapter 7: The Harmonic Oscillator.",
          check1: "Normalize piecewise continuous wavefunctions across finite barrier boundaries.",
          check2: "Evaluate commutator bracket [x̂², p̂] using canonical commutation relations.",
          check3: "Calculate quantum transmission coefficients through rectangular potential barriers."
        };

      case 'economics':
        return {
          code: 'ECON 1110: Intermediate Macroeconomics & Monetary Policy',
          dept: 'Department of Economics · Spring Term',
          lec: 'Lecture 16 · Prof. J. M. Keynes',
          title: "IS-LM Equilibrium, Aggregate Demand & Central Bank Taylor Rules",
          topic: "Monetary Equilibrium",
          netYield: 'Y = C(Y-T) + I(r) + G',
          formula: 'M/P = L(Y, i) ; i = r + π^e',
          coreQ: "How does monetary expansion shift the LM schedule and affect real interest rates and capital investment under sticky prices?",
          keywords: ["• IS curve equilibrium", "• Liquidity preference (LM)", "• Marginal propensity to consume (MPC)", "• Fiscal expenditure multiplier", "• Zero lower bound (ZLB)"],
          thermo: "Fiscal multiplier k = 1 / (1 - MPC) magnifies autonomous government expenditure in under-utilized equilibria.",
          p1Title: "1. Phase I: Goods Market Equilibrium (The IS Schedule)",
          p1Text: "Aggregate output Y equals the sum of planned expenditures: consumption, investment sensitive to real interest rates r, and exogenous fiscal expenditure G.",
          p1Formula: "Y = C(Y - T) + I(r) + G + NX",
          p2Title: "2. Phase II: Money Market Equilibrium (The LM Schedule)",
          p2Text: "Real money supply M/P is equilibrated by liquidity preference demand L(r + π^e, Y). Central bank interest rate targets determine the trajectory of nominal interest rates.",
          p3Title: "3. Phase III: Policy Interactions & Crowding Out",
          p3Text: "Fiscal stimulus shifts the IS curve rightward, raising output while inducing partial private investment crowding-out via elevated interest rates unless accommodated by monetary expansion.",
          summary: "Joint equilibrium in goods and asset markets determines short-run macroeconomic output and real borrowing costs.",
          book1: "Macroeconomics (Mankiw, 11th Ed.) · Chapter 10 & 11: Aggregate Demand in the Open Economy.",
          book2: "Macroeconomics (Blanchard, 8th Ed.) · Chapter 5: Goods and Financial Markets: The IS-LM Model.",
          check1: "Derive algebraic slope of IS and LM curves under variable investment interest elasticities.",
          check2: "Trace effects of open market bond purchases on yield curves and domestic exchange rates.",
          check3: "Contrast Keynesian liquidity traps at the zero lower bound with quantitative easing mechanisms."
        };

      default: // biology
        return {
          code: 'BIOL 201: Cell Biology & Biochemical Energetics',
          dept: 'Department of Biological Sciences · Spring Term',
          lec: 'Lecture 14 · Dr. Aris Thorne',
          title: "Cellular Respiration, Glycolytic Pathways & Chemiosmosis",
          topic: "Aerobic Glycolysis",
          netYield: '36-38 ATP per Glucose',
          formula: 'C6H12O6 + 6O2 → 6CO2 + 6H2O',
          coreQ: "How does the mitochondrial proton gradient drive F0-F1 ATP synthase rotation?",
          keywords: ["• Substrate phosphorylation", "• Pyruvate dehydrogenase", "• Acetyl-CoA condensation", "• Cytochrome c oxidase", "• Proton motive force (ΔμH+)"],
          thermo: "ΔG° = -686 kcal/mol under standard physiological cellular constraints.",
          p1Title: "1. Phase I: Cytosolic Glycolysis",
          p1Text: "Glucose (6C) undergoes investment of 2 ATP molecules via Hexokinase and Phosphofructokinase-1 (PFK-1). Cleavage by Aldolase produces two interchangeable triose phosphates: DHAP and Glyceraldehyde 3-phosphate (G3P).",
          p1Formula: "1 Glucose + 2 NAD+ + 2 ADP + 2 Pi → 2 Pyruvate + 2 NADH + 2 ATP + 2 H2O",
          p2Title: "2. Phase II: Mitochondrial Matrix Krebs (Citric Acid) Cycle",
          p2Text: "Pyruvate transitions into the mitochondrial matrix via pyruvate translocase. Oxidative decarboxylation by the multi-enzyme Pyruvate Dehydrogenase Complex yields Acetyl-CoA, which condenses with Oxaloacetate (4C) to synthesize Citrate (6C).",
          p3Title: "3. Phase III: Chemiosmosis & Electron Transport Chain",
          p3Text: "Electrons transferred through Complexes I, III, and IV pump protons from the matrix across into the intermembrane space, creating an electrochemical transmembrane gradient. ATP Synthase harnesses this proton-motive force through rotational catalysis to generate high-energy ATP anhydrides.",
          summary: "Oxygen operates as the terminal electron acceptor, reduced to water. In anaerobic environments, pyruvate undergoes fermentation to regenerate NAD⁺ necessary for sustained glycolytic flux.",
          book1: "Lehninger Principles of Biochemistry (8th Ed.) · Chapter 14: Glycolysis, Gluconeogenesis, and Pentose Phosphate.",
          book2: "Molecular Biology of the Cell (7th Ed.) · Chapter 14: Energy Conversion in Mitochondria.",
          check1: "Memorize all 10 enzymatic reactions of glycolysis and allosteric regulators of PFK-1.",
          check2: "Calculate net ATP yields under variable malate-aspartate vs glycerol phosphate shuttles.",
          check3: "Trace electron flow from NADH through CoQ (ubiquinone) to Cytochrome c and Complex IV."
        };
    }
  };

  const details = getLectureDetails();

  return (
    <div className="fixed inset-0 z-50 bg-[#fafafa] text-zinc-900 overflow-y-auto">
      {/* Top Academic Navigation */}
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-emerald-800" />
          <div>
            <h1 className="text-sm font-bold tracking-tight text-zinc-900 leading-none">
              {details.code}
            </h1>
            <span className="text-[11px] text-zinc-500">
              {details.dept}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onDismiss}
            className="text-xs text-zinc-600 hover:text-zinc-900 font-medium px-3 py-1.5 rounded-md hover:bg-zinc-100 border border-zinc-200 transition flex items-center gap-1.5"
            title="Return to curriculum portal"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Resume Curriculum Portal</span>
          </button>
        </div>
      </header>

      {/* Course Subheader & Tabs */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-200 mb-6 gap-4">
          <div>
            <span className="text-xs font-mono font-medium text-emerald-800 uppercase tracking-wider block mb-1">
              {details.lec}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
              {details.title}
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs shrink-0">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-md transition font-medium ${
                activeTab === 'notes' ? 'bg-white text-zinc-900 shadow-xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Cornell Notes
            </button>
            <button
              onClick={() => setActiveTab('readings')}
              className={`px-3 py-1.5 rounded-md transition font-medium ${
                activeTab === 'readings' ? 'bg-white text-zinc-900 shadow-xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Assigned Texts
            </button>
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-3 py-1.5 rounded-md transition font-medium ${
                activeTab === 'syllabus' ? 'bg-white text-zinc-900 shadow-xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Midterm Exam Prep
            </button>
          </div>
        </div>

        {/* Content based on tab */}
        {activeTab === 'notes' && (
          <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-xs mb-12">
            {/* Cornell Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-6 border-b border-zinc-200 text-xs text-zinc-500 font-mono">
              <div>
                <span className="block text-zinc-400 uppercase text-[10px]">Topic</span>
                <span className="text-zinc-800 font-semibold">{details.topic}</span>
              </div>
              <div>
                <span className="block text-zinc-400 uppercase text-[10px]">Term</span>
                <span className="text-zinc-800 font-semibold">Active Academic Term</span>
              </div>
              <div>
                <span className="block text-zinc-400 uppercase text-[10px]">Invariant / Metric</span>
                <span className="text-zinc-800 font-semibold">{details.netYield}</span>
              </div>
              <div>
                <span className="block text-zinc-400 uppercase text-[10px]">Governing Relation</span>
                <span className="text-zinc-800 font-semibold">{details.formula}</span>
              </div>
            </div>

            {/* Cornell Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              {/* Cues Column */}
              <div className="space-y-6 border-r border-zinc-100 pr-6 text-xs">
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase tracking-wider mb-1">Core Questions</h4>
                  <p className="text-zinc-600 italic leading-relaxed">
                    {details.coreQ}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-zinc-900 uppercase tracking-wider mb-1">Keywords &amp; Axioms</h4>
                  <ul className="space-y-1 text-zinc-600 font-mono">
                    {details.keywords.map((k, idx) => (
                      <li key={idx}>{k}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-zinc-900 uppercase tracking-wider mb-1">Constraints</h4>
                  <p className="text-zinc-600 leading-relaxed">
                    {details.thermo}
                  </p>
                </div>
              </div>

              {/* Main Notes Column */}
              <div className="md:col-span-2 space-y-6 text-sm leading-relaxed text-zinc-700">
                <section>
                  <h3 className="text-base font-bold text-zinc-900 mb-2">
                    {details.p1Title}
                  </h3>
                  <p className="mb-2">
                    {details.p1Text}
                  </p>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-md p-3 font-mono text-xs text-zinc-800">
                    {details.p1Formula}
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold text-zinc-900 mb-2">
                    {details.p2Title}
                  </h3>
                  <p className="mb-2">
                    {details.p2Text}
                  </p>
                </section>

                <section>
                  <h3 className="text-base font-bold text-zinc-900 mb-2">
                    {details.p3Title}
                  </h3>
                  <p>
                    {details.p3Text}
                  </p>
                </section>
              </div>
            </div>

            {/* Summary Block */}
            <div className="mt-8 pt-6 border-t border-zinc-200">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">
                Summary &amp; Synthetic Takeaways
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {details.summary}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'readings' && (
          <div className="bg-white border border-zinc-200 rounded-xl p-8 space-y-4 mb-12">
            <h3 className="text-base font-bold text-zinc-900">Required Course Textbooks &amp; Literature</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 border border-zinc-100 bg-zinc-50 rounded-lg">
                <span className="font-bold text-zinc-900 block">{details.book1}</span>
                <span className="text-zinc-600">Assigned weekly academic chapter readings.</span>
              </div>
              <div className="p-3 border border-zinc-100 bg-zinc-50 rounded-lg">
                <span className="font-bold text-zinc-900 block">{details.book2}</span>
                <span className="text-zinc-600">Theoretical foundations and colloquium problem sets.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'syllabus' && (
          <div className="bg-white border border-zinc-200 rounded-xl p-8 space-y-4 mb-12">
            <h3 className="text-base font-bold text-zinc-900">Midterm Examination Study Checklist</h3>
            <div className="space-y-2 text-xs text-zinc-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{details.check1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{details.check2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{details.check3}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
