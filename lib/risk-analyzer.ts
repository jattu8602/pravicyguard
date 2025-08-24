import { PRIVACY_RISK_PATTERNS } from '@/lib/privacy-patterns'

export interface RiskAnalysis {
  riskScore: number
  riskLevel: 'low' | 'medium' | 'high'
  detectedPatterns: string[]
  confidence: number
  recommendations: string[]
}

export interface ChatbotInteraction {
  message: string
  website: string
  timestamp: Date
  userAgent: string
}

export class PrivacyRiskAnalyzer {
  private patterns = PRIVACY_RISK_PATTERNS

  analyzeText(text: string): RiskAnalysis {
    const detectedPatterns: string[] = []
    let riskScore = 0

    // Check against privacy risk patterns
    this.patterns.forEach((pattern, index) => {
      if (pattern.test(text)) {
        detectedPatterns.push(this.getPatternName(index))
        riskScore += this.getPatternRiskScore(index)
      }
    })

    // Calculate overall risk level
    const riskLevel = this.calculateRiskLevel(riskScore)
    const confidence = this.calculateConfidence(
      detectedPatterns.length,
      text.length
    )
    const recommendations = this.generateRecommendations(
      detectedPatterns,
      riskLevel
    )

    return {
      riskScore: Math.min(riskScore, 100),
      riskLevel,
      detectedPatterns,
      confidence,
      recommendations,
    }
  }

  analyzeChatbotInteraction(interaction: ChatbotInteraction): RiskAnalysis {
    const analysis = this.analyzeText(interaction.message)

    // Add context-specific analysis for chatbot interactions
    if (analysis.riskLevel === 'high') {
      analysis.recommendations.unshift(
        'Immediately stop sharing information with this chatbot',
        'Clear cookies and cache for this website',
        'Consider reporting this website for suspicious activity'
      )
    }

    return analysis
  }

  private getPatternName(index: number): string {
    const patternNames = [
      'Phone Number Request',
      'Email Address Request',
      'Home Address Request',
      'Credit Card Request',
      'Social Security Number Request',
      'Date of Birth Request',
      'ID Number Request',
      'Bank Account Request',
      'Security Question Request',
      'Income Information Request',
      'Name Request',
      'Age Request',
      'Location Request',
      'City Request',
      'Country Request',
      'Zip Code Request',
      'Postal Code Request',
      'Company Request',
      'Job Request',
      'Occupation Request',
    ]
    return patternNames[index] || 'Unknown Pattern'
  }

  private getPatternRiskScore(index: number): number {
    // High-risk patterns (financial, identity)
    if ([3, 4, 6, 7, 8].includes(index)) return 25
    // Medium-risk patterns (contact, personal)
    if ([0, 1, 2, 5, 9, 10, 11].includes(index)) return 15
    // Low-risk patterns (general info)
    return 8
  }

  private calculateRiskLevel(score: number): 'low' | 'medium' | 'high' {
    if (score >= 50) return 'high'
    if (score >= 25) return 'medium'
    return 'low'
  }

  private calculateConfidence(
    patternCount: number,
    textLength: number
  ): number {
    // Higher confidence with more patterns and longer text
    const baseConfidence = Math.min(patternCount * 20, 80)
    const lengthBonus = Math.min(textLength / 100, 20)
    return Math.min(baseConfidence + lengthBonus, 100)
  }

  private generateRecommendations(
    patterns: string[],
    riskLevel: string
  ): string[] {
    const recommendations: string[] = []

    if (riskLevel === 'high') {
      recommendations.push(
        'Do not provide the requested information',
        'Leave the website immediately',
        'Clear browser cookies and cache',
        'Run a security scan on your device'
      )
    } else if (riskLevel === 'medium') {
      recommendations.push(
        'Be cautious about sharing personal information',
        "Verify the website's legitimacy",
        'Consider using privacy-focused browser settings'
      )
    } else {
      recommendations.push(
        'Monitor for any unusual activity',
        'Keep privacy settings enabled'
      )
    }

    // Pattern-specific recommendations
    if (patterns.some((p) => p.includes('Credit Card') || p.includes('Bank'))) {
      recommendations.push('Never share financial information through chat')
    }

    if (
      patterns.some((p) => p.includes('Social Security') || p.includes('ID'))
    ) {
      recommendations.push('Report this website to authorities')
    }

    return recommendations
  }
}

export const riskAnalyzer = new PrivacyRiskAnalyzer()
