// Service d'export CSV pour Hubble

export interface ExportData {
  headers: string[]
  rows: (string | number)[][]
  filename: string
}

export class ExportService {
  /**
   * Convertit des données en format CSV
   */
  static toCSV(data: ExportData): string {
    const { headers, rows } = data
    
    // Échapper les guillemets et entourer de guillemets si nécessaire
    const escapeCSVField = (field: string | number): string => {
      const str = String(field)
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }

    // Créer le CSV
    const csvHeaders = headers.map(escapeCSVField).join(',')
    const csvRows = rows.map(row => 
      row.map(escapeCSVField).join(',')
    ).join('\n')

    return `${csvHeaders}\n${csvRows}`
  }

  /**
   * Télécharge un fichier CSV
   */
  static downloadCSV(data: ExportData): void {
    const csv = this.toCSV(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${data.filename}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  /**
   * Exporte les données des prompts
   */
  static exportPrompts(prompts: any[]): void {
    const data: ExportData = {
      headers: [
        'ID',
        'Prompt',
        'Catégorie',
        'Tags',
        'Statut',
        'Mentions',
        'Score de visibilité',
        'Dernière exécution',
        'Créé le'
      ],
      rows: prompts.map(prompt => [
        prompt.id,
        prompt.text,
        prompt.category,
        Array.isArray(prompt.tags) ? prompt.tags.join('; ') : prompt.tags || '',
        prompt.status,
        prompt.mentions || 0,
        prompt.visibilityScore || 0,
        prompt.lastRun || '',
        prompt.createdAt || ''
      ]),
      filename: `hubble-prompts-${new Date().toISOString().split('T')[0]}`
    }

    this.downloadCSV(data)
  }

  /**
   * Exporte les données des concurrents
   */
  static exportCompetitors(competitors: any[]): void {
    const data: ExportData = {
      headers: [
        'ID',
        'Nom',
        'Catégorie',
        'Score de visibilité',
        'Mentions',
        'Sentiment',
        'Position moyenne',
        'Part de voix (%)',
        'Tendance',
        'Dernière mention'
      ],
      rows: competitors.map(competitor => [
        competitor.id,
        competitor.name,
        competitor.category,
        competitor.visibilityScore,
        competitor.mentions,
        competitor.sentiment,
        competitor.avgPosition,
        competitor.shareOfVoice,
        competitor.trend,
        competitor.lastMention
      ]),
      filename: `hubble-competitors-${new Date().toISOString().split('T')[0]}`
    }

    this.downloadCSV(data)
  }

  /**
   * Exporte les données des sources
   */
  static exportSources(sources: any[]): void {
    const data: ExportData = {
      headers: [
        'ID',
        'Domaine',
        'Titre',
        'URL',
        'Catégorie',
        'Type',
        'Mentions',
        'Score de confiance',
        'Autorité',
        'Sentiment',
        'Contrôlée',
        'Dernière citation'
      ],
      rows: sources.map(source => [
        source.id,
        source.domain,
        source.title,
        source.url,
        source.category,
        source.type,
        source.mentions,
        source.trustScore,
        source.authority,
        source.sentiment,
        source.controlled ? 'Oui' : 'Non',
        source.lastCited
      ]),
      filename: `hubble-sources-${new Date().toISOString().split('T')[0]}`
    }

    this.downloadCSV(data)
  }

  /**
   * Exporte les données de croissance
   */
  static exportGrowthData(growthData: any[]): void {
    const data: ExportData = {
      headers: [
        'Date',
        'Score de visibilité',
        'Mentions',
        'Position moyenne',
        'Part de voix (%)',
        'Sentiment',
        'Nouveaux prompts',
        'Concurrents'
      ],
      rows: growthData.map(entry => [
        entry.date,
        entry.visibilityScore,
        entry.mentions,
        entry.avgPosition,
        entry.shareOfVoice,
        entry.sentiment,
        entry.newPrompts,
        entry.competitors
      ]),
      filename: `hubble-growth-${new Date().toISOString().split('T')[0]}`
    }

    this.downloadCSV(data)
  }

  /**
   * Exporte un rapport complet
   */
  static exportFullReport(data: {
    prompts: any[]
    competitors: any[]
    sources: any[]
    growthData: any[]
    summary: any
  }): void {
    const reportData: ExportData = {
      headers: [
        'Type de données',
        'Métrique',
        'Valeur',
        'Date'
      ],
      rows: [
        // Résumé
        ['Résumé', 'Score de visibilité actuel', data.summary.currentScore, new Date().toISOString()],
        ['Résumé', 'Mentions totales', data.summary.totalMentions, new Date().toISOString()],
        ['Résumé', 'Prompts actifs', data.prompts.filter(p => p.status === 'active').length, new Date().toISOString()],
        ['Résumé', 'Concurrents suivis', data.competitors.length, new Date().toISOString()],
        ['Résumé', 'Sources surveillées', data.sources.length, new Date().toISOString()],
        
        // Top prompts
        ...data.prompts
          .sort((a, b) => (b.visibilityScore || 0) - (a.visibilityScore || 0))
          .slice(0, 5)
          .map((prompt, index) => [
            'Top Prompts',
            `#${index + 1} - ${prompt.text.substring(0, 50)}...`,
            prompt.visibilityScore || 0,
            prompt.lastRun || ''
          ]),

        // Top concurrents
        ...data.competitors
          .sort((a, b) => b.visibilityScore - a.visibilityScore)
          .slice(0, 5)
          .map((competitor, index) => [
            'Top Concurrents',
            `#${index + 1} - ${competitor.name}`,
            competitor.visibilityScore,
            competitor.lastMention
          ]),

        // Top sources
        ...data.sources
          .sort((a, b) => b.mentions - a.mentions)
          .slice(0, 5)
          .map((source, index) => [
            'Top Sources',
            `#${index + 1} - ${source.domain}`,
            source.mentions,
            source.lastCited
          ])
      ],
      filename: `hubble-rapport-complet-${new Date().toISOString().split('T')[0]}`
    }

    this.downloadCSV(reportData)
  }
}

// Hook pour utiliser le service d'export
export function useExport() {
  return {
    exportPrompts: ExportService.exportPrompts,
    exportCompetitors: ExportService.exportCompetitors,
    exportSources: ExportService.exportSources,
    exportGrowthData: ExportService.exportGrowthData,
    exportFullReport: ExportService.exportFullReport
  }
} 