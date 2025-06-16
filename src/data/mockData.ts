export interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  stats: {
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    threePointers: number;
    fieldGoalPercentage: number;
    gamesPlayed: number;
    fantasyPoints: number;
  };
  last5Games: {
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    threePointers: number;
    fantasyPoints: number;
  };
  lastWeek: {
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    threePointers: number;
    fantasyPoints: number;
    gamesPlayed: number;
  };
  lastMonth: {
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    threePointers: number;
    fantasyPoints: number;
    gamesPlayed: number;
  };
  injuryStatus: 'healthy' | 'questionable' | 'out' | 'day-to-day';
  tradeValue: number;
  consistency: number;
  efficiency: number;
  hotScore: number;
  weeklyTrend: number;
  monthlyTrend: number;
}

export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'A\'ja Wilson',
    team: 'LAS',
    position: 'F',
    stats: {
      points: 27.3,
      rebounds: 11.9,
      assists: 3.5,
      steals: 1.8,
      blocks: 2.3,
      threePointers: 0.5,
      fieldGoalPercentage: 51.2,
      gamesPlayed: 38,
      fantasyPoints: 47.8
    },
    last5Games: {
      points: 29.2,
      rebounds: 12.4,
      assists: 4.0,
      steals: 2.2,
      blocks: 2.8,
      threePointers: 0.8,
      fantasyPoints: 52.4
    },
    lastWeek: {
      points: 31.5,
      rebounds: 13.2,
      assists: 4.2,
      steals: 2.5,
      blocks: 3.0,
      threePointers: 1.0,
      fantasyPoints: 56.2,
      gamesPlayed: 3
    },
    lastMonth: {
      points: 28.8,
      rebounds: 12.1,
      assists: 3.8,
      steals: 2.0,
      blocks: 2.5,
      threePointers: 0.7,
      fantasyPoints: 50.1,
      gamesPlayed: 12
    },
    injuryStatus: 'healthy',
    tradeValue: 95,
    consistency: 92,
    efficiency: 88,
    hotScore: 94,
    weeklyTrend: 17.6,
    monthlyTrend: 4.8
  },
  {
    id: '2',
    name: 'Breanna Stewart',
    team: 'NY',
    position: 'F',
    stats: {
      points: 23.0,
      rebounds: 9.5,
      assists: 3.9,
      steals: 1.5,
      blocks: 1.8,
      threePointers: 2.3,
      fieldGoalPercentage: 45.8,
      gamesPlayed: 40,
      fantasyPoints: 42.0
    },
    last5Games: {
      points: 25.6,
      rebounds: 10.2,
      assists: 4.2,
      steals: 1.8,
      blocks: 2.0,
      threePointers: 2.8,
      fantasyPoints: 46.6
    },
    lastWeek: {
      points: 26.3,
      rebounds: 10.8,
      assists: 4.5,
      steals: 1.7,
      blocks: 2.2,
      threePointers: 3.0,
      fantasyPoints: 48.5,
      gamesPlayed: 3
    },
    lastMonth: {
      points: 24.2,
      rebounds: 9.8,
      assists: 4.1,
      steals: 1.6,
      blocks: 1.9,
      threePointers: 2.5,
      fantasyPoints: 44.1,
      gamesPlayed: 11
    },
    injuryStatus: 'healthy',
    tradeValue: 89,
    consistency: 85,
    efficiency: 82,
    hotScore: 87,
    weeklyTrend: 15.5,
    monthlyTrend: 5.0
  },
  {
    id: '3',
    name: 'Napheesa Collier',
    team: 'MIN',
    position: 'F',
    stats: {
      points: 21.0,
      rebounds: 9.7,
      assists: 3.4,
      steals: 2.4,
      blocks: 1.3,
      threePointers: 1.6,
      fieldGoalPercentage: 48.3,
      gamesPlayed: 40,
      fantasyPoints: 40.4
    },
    last5Games: {
      points: 23.4,
      rebounds: 11.0,
      assists: 3.8,
      steals: 2.8,
      blocks: 1.6,
      threePointers: 2.0,
      fantasyPoints: 44.6
    },
    lastWeek: {
      points: 24.7,
      rebounds: 11.5,
      assists: 4.0,
      steals: 3.0,
      blocks: 1.8,
      threePointers: 2.2,
      fantasyPoints: 47.2,
      gamesPlayed: 3
    },
    lastMonth: {
      points: 22.1,
      rebounds: 10.2,
      assists: 3.6,
      steals: 2.6,
      blocks: 1.4,
      threePointers: 1.8,
      fantasyPoints: 42.0,
      gamesPlayed: 12
    },
    injuryStatus: 'healthy',
    tradeValue: 86,
    consistency: 88,
    efficiency: 85,
    hotScore: 91,
    weeklyTrend: 16.8,
    monthlyTrend: 4.0
  },
  {
    id: '4',
    name: 'Sabrina Ionescu',
    team: 'NY',
    position: 'G',
    stats: {
      points: 18.2,
      rebounds: 4.4,
      assists: 6.2,
      steals: 0.9,
      blocks: 0.3,
      threePointers: 3.2,
      fieldGoalPercentage: 44.1,
      gamesPlayed: 40,
      fantasyPoints: 35.2
    },
    last5Games: {
      points: 20.8,
      rebounds: 5.0,
      assists: 7.2,
      steals: 1.2,
      blocks: 0.4,
      threePointers: 3.8,
      fantasyPoints: 39.4
    },
    lastWeek: {
      points: 22.0,
      rebounds: 5.3,
      assists: 7.8,
      steals: 1.3,
      blocks: 0.5,
      threePointers: 4.2,
      fantasyPoints: 42.1,
      gamesPlayed: 3
    },
    lastMonth: {
      points: 19.5,
      rebounds: 4.7,
      assists: 6.8,
      steals: 1.0,
      blocks: 0.4,
      threePointers: 3.5,
      fantasyPoints: 37.9,
      gamesPlayed: 11
    },
    injuryStatus: 'healthy',
    tradeValue: 82,
    consistency: 79,
    efficiency: 77,
    hotScore: 85,
    weeklyTrend: 19.6,
    monthlyTrend: 7.7
  },
  {
    id: '5',
    name: 'Alyssa Thomas',
    team: 'CONN',
    position: 'F',
    stats: {
      points: 13.1,
      rebounds: 8.4,
      assists: 7.9,
      steals: 1.5,
      blocks: 0.9,
      threePointers: 0.0,
      fieldGoalPercentage: 52.8,
      gamesPlayed: 40,
      fantasyPoints: 33.8
    },
    last5Games: {
      points: 15.2,
      rebounds: 9.6,
      assists: 8.8,
      steals: 1.8,
      blocks: 1.2,
      threePointers: 0.0,
      fantasyPoints: 37.6
    },
    lastWeek: {
      points: 11.0,
      rebounds: 7.5,
      assists: 6.8,
      steals: 1.2,
      blocks: 0.7,
      threePointers: 0.0,
      fantasyPoints: 28.2,
      gamesPlayed: 2
    },
    lastMonth: {
      points: 12.8,
      rebounds: 8.1,
      assists: 7.5,
      steals: 1.4,
      blocks: 0.8,
      threePointers: 0.0,
      fantasyPoints: 32.6,
      gamesPlayed: 10
    },
    injuryStatus: 'questionable',
    tradeValue: 78,
    consistency: 84,
    efficiency: 81,
    hotScore: 68,
    weeklyTrend: -16.6,
    monthlyTrend: -3.6
  },
  {
    id: '6',
    name: 'Caitlin Clark',
    team: 'IND',
    position: 'G',
    stats: {
      points: 19.2,
      rebounds: 5.7,
      assists: 8.4,
      steals: 1.3,
      blocks: 0.9,
      threePointers: 3.0,
      fieldGoalPercentage: 41.7,
      gamesPlayed: 40,
      fantasyPoints: 40.5
    },
    last5Games: {
      points: 22.0,
      rebounds: 6.2,
      assists: 9.8,
      steals: 1.6,
      blocks: 1.2,
      threePointers: 3.6,
      fantasyPoints: 45.4
    },
    lastWeek: {
      points: 25.3,
      rebounds: 6.8,
      assists: 11.2,
      steals: 1.8,
      blocks: 1.5,
      threePointers: 4.2,
      fantasyPoints: 52.8,
      gamesPlayed: 3
    },
    lastMonth: {
      points: 20.8,
      rebounds: 6.0,
      assists: 9.1,
      steals: 1.5,
      blocks: 1.1,
      threePointers: 3.3,
      fantasyPoints: 43.8,
      gamesPlayed: 12
    },
    injuryStatus: 'healthy',
    tradeValue: 84,
    consistency: 76,
    efficiency: 73,
    hotScore: 92,
    weeklyTrend: 30.4,
    monthlyTrend: 8.1
  },
  {
    id: '7',
    name: 'DiJonai Carrington',
    team: 'CONN',
    position: 'G',
    stats: {
      points: 12.8,
      rebounds: 5.1,
      assists: 1.6,
      steals: 1.2,
      blocks: 0.4,
      threePointers: 1.8,
      fieldGoalPercentage: 43.2,
      gamesPlayed: 38,
      fantasyPoints: 24.9
    },
    last5Games: {
      points: 18.4,
      rebounds: 6.2,
      assists: 2.2,
      steals: 1.8,
      blocks: 0.6,
      threePointers: 2.8,
      fantasyPoints: 33.0
    },
    lastWeek: {
      points: 21.7,
      rebounds: 7.0,
      assists: 2.7,
      steals: 2.3,
      blocks: 0.8,
      threePointers: 3.5,
      fantasyPoints: 39.0,
      gamesPlayed: 3
    },
    lastMonth: {
      points: 15.2,
      rebounds: 5.8,
      assists: 1.9,
      steals: 1.5,
      blocks: 0.5,
      threePointers: 2.3,
      fantasyPoints: 28.2,
      gamesPlayed: 11
    },
    injuryStatus: 'healthy',
    tradeValue: 72,
    consistency: 71,
    efficiency: 68,
    hotScore: 89,
    weeklyTrend: 56.6,
    monthlyTrend: 13.3
  },
  {
    id: '8',
    name: 'Kelsey Mitchell',
    team: 'IND',
    position: 'G',
    stats: {
      points: 16.2,
      rebounds: 2.8,
      assists: 2.3,
      steals: 0.8,
      blocks: 0.2,
      threePointers: 2.7,
      fieldGoalPercentage: 42.1,
      gamesPlayed: 39,
      fantasyPoints: 26.8
    },
    last5Games: {
      points: 19.8,
      rebounds: 3.4,
      assists: 2.8,
      steals: 1.2,
      blocks: 0.4,
      threePointers: 3.6,
      fantasyPoints: 32.2
    },
    lastWeek: {
      points: 22.3,
      rebounds: 3.8,
      assists: 3.2,
      steals: 1.5,
      blocks: 0.5,
      threePointers: 4.2,
      fantasyPoints: 36.5,
      gamesPlayed: 3
    },
    lastMonth: {
      points: 17.9,
      rebounds: 3.1,
      assists: 2.6,
      steals: 1.0,
      blocks: 0.3,
      threePointers: 3.1,
      fantasyPoints: 29.0,
      gamesPlayed: 12
    },
    injuryStatus: 'healthy',
    tradeValue: 75,
    consistency: 73,
    efficiency: 70,
    hotScore: 83,
    weeklyTrend: 36.2,
    monthlyTrend: 8.2
  }
];

export const mockWaiverPlayers = [
  {
    id: '7',
    name: 'DiJonai Carrington',
    team: 'CONN',
    position: 'G',
    availability: 85,
    recentPerformance: 88,
    priority: 92,
    reason: 'Increased role with Thomas questionable, averaging 15.4 points over last 5 games'
  },
  {
    id: '8',
    name: 'Leonie Fiebich',
    team: 'NY',
    position: 'F',
    availability: 78,
    recentPerformance: 82,
    priority: 87,
    reason: 'Consistent starter with strong defensive stats, 2.1 steals per game last week'
  },
  {
    id: '9',
    name: 'Kelsey Mitchell',
    team: 'IND',
    position: 'G',
    availability: 65,
    recentPerformance: 85,
    priority: 83,
    reason: 'Hot shooting streak, 45% from three over last 7 games with increased usage'
  }
];