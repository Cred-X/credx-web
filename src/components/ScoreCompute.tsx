"use client";

import { useState } from "react";
import { Shield, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScoreResults } from "@/components/ScoreResults";
import type { WalletScore, WalletScoreError } from "@/types/wallet";

export function ScoreCompute() {
	const [walletAddress, setWalletAddress] = useState("");
	const [isComputing, setIsComputing] = useState(false);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState<WalletScore | null>(null);
	const [error, setError] = useState<WalletScoreError | null>(null);

	const handleComputeScore = () => {
		if (!walletAddress.trim()) return;

		setIsComputing(true);
		setError(null);
		setShowScore(false);

		setTimeout(() => {
			const shouldError = Math.random() < 0.1;

			if (shouldError) {
				setError({
					message:
						"Unable to fetch wallet data. Please verify the address and try again.",
				});
				setIsComputing(false);
				return;
			}

			const mockScore: WalletScore = {
				final_score: Math.floor(Math.random() * (950 - 300) + 300),
				tnx_score: Math.floor(Math.random() * (100 - 50) + 50),
				age_score: Math.floor(Math.random() * (100 - 40) + 40),
				assets_score: Math.floor(Math.random() * (100 - 30) + 30),
			};

			setScore(mockScore);
			setShowScore(true);
			setIsComputing(false);
		}, 2000);
	};

	return (
		<>
			<section className="relative overflow-hidden">
				<div className="gradient-hero absolute inset-0 pointer-events-none" />
				<div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
				<div
					className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"
					style={{ animationDelay: "1.5s" }}
				/>

				<div className="container mx-auto px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32 relative">
					<div className="max-w-4xl mx-auto">
						<div className="flex justify-center mb-8 animate-fade-in">
							<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-subtle transition-smooth hover:shadow-glow-sm">
								<div className="w-2 h-2 rounded-full bg-linear-to-r from-primary to-accent animate-pulse" />
								<span className="text-sm text-muted-foreground font-medium">
									On-Chain Reputation Oracle
								</span>
							</div>
						</div>

						<h1
							className="text-5xl md:text-7xl font-bold tracking-tight text-center mb-6 leading-[1.1] animate-fade-in"
							style={{ animationDelay: "0.1s" }}
						>
							Compute your <br className="hidden sm:block" />
							<span className="gradient-text">on-chain reputation</span>
						</h1>

						<p
							className="text-xl md:text-2xl text-muted-foreground text-center max-w-2xl mx-auto font-light leading-relaxed animate-fade-in"
							style={{ animationDelay: "0.2s" }}
						>
							Your DeFi creditworthiness, transparently powered by Solana.
						</p>

						<div
							className="mt-16 max-w-2xl mx-auto animate-fade-in"
							style={{ animationDelay: "0.3s" }}
						>
							<div className="bg-card/80 border border-border/30 shadow-xl rounded-xl backdrop-blur-sm transition-smooth">
								<div className="pt-8 pb-7 px-6">
									<div className="flex flex-col sm:flex-row gap-3">
										<Input
											placeholder="Enter Solana wallet address..."
											value={walletAddress}
											onChange={(e) => setWalletAddress(e.target.value)}
											className="flex-1 h-12 bg-[hsl(228_10%_10%)] border-border/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 text-base placeholder:text-muted-foreground/40 transition-smooth"
											disabled={isComputing}
										/>
										<Button
											onClick={handleComputeScore}
											disabled={!walletAddress.trim() || isComputing}
											className="h-12 px-8 gap-2 font-semibold bg-linear-to-r from-primary to-accent hover:opacity-90 transition-smooth shadow-glow-sm border-0"
											size="lg"
										>
											{isComputing ? (
												<>
													<div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
													Computing
												</>
											) : (
												<>
													Compute Score
													<ArrowRight className="w-4 h-4" />
												</>
											)}
										</Button>
									</div>

									<div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
										<Shield className="w-3.5 h-3.5 text-muted-foreground/70" />
										<span>Your data never leaves the blockchain</span>
									</div>
								</div>
							</div>
						</div>

						{error && (
							<div className="max-w-2xl mx-auto mt-4 animate-scale-in">
								<Alert
									variant="destructive"
									className="relative border-destructive/30 bg-destructive/10 backdrop-blur-sm"
								>
									<AlertDescription className="flex items-center justify-between gap-4">
										<span className="text-sm">{error.message}</span>
										<Button
											variant="ghost"
											size="icon"
											className="h-7 w-7 shrink-0 hover:bg-destructive/20"
											onClick={() => setError(null)}
										>
											<X className="h-4 w-4" />
										</Button>
									</AlertDescription>
								</Alert>
							</div>
						)}
					</div>
				</div>
			</section>

			{showScore && score && <ScoreResults score={score} />}
		</>
	);
}
