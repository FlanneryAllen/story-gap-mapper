import React, { useState } from 'react';
import { Search, AlertTriangle, TrendingUp, Users, Shield, Lightbulb, Heart, CheckCircle } from 'lucide-react';

const StoryGapMapper = () => {
  const [organizationType, setOrganizationType] = useState('');
  const [currentStories, setCurrentStories] = useState([]);
  const [stakeholderPriorities, setStakeholderPriorities] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [newStory, setNewStory] = useState('');

  const orgTypes = [
    'Technology/SaaS',
    'Healthcare/Biotech',
    'Financial Services',
    'Manufacturing',
    'Professional Services',
    'Non-profit',
    'Retail/Consumer',
    'Education'
  ];

  const storyCategories = [
    { id: 'origin', name: 'Origin Stories', icon: Heart, description: 'Founding story, mission genesis, why we exist' },
    { id: 'customer', name: 'Customer Success', icon: TrendingUp, description: 'Customer wins, transformations, case studies' },
    { id: 'product', name: 'Product Stories', icon: Lightbulb, description: 'Innovation journey, feature development, roadmap' },
    { id: 'culture', name: 'Culture & Values', icon: Users, description: 'Employee stories, values in action, workplace culture' },
    { id: 'leadership', name: 'Leadership Vision', icon: Shield, description: 'Strategic direction, industry insights, thought leadership' },
    { id: 'crisis', name: 'Challenge & Recovery', icon: AlertTriangle, description: 'How we handle problems, lessons learned, resilience' }
  ];

  const stakeholderTypes = [
    'Customers/Clients',
    'Employees',
    'Investors',
    'Partners',
    'Industry Peers',
    'Media/Analysts',
    'Regulators',
    'Local Community'
  ];

  const addStory = () => {
    if (newStory.trim()) {
      setCurrentStories([...currentStories, newStory.trim()]);
      setNewStory('');
    }
  };

  const removeStory = (index) => {
    setCurrentStories(currentStories.filter((_, i) => i !== index));
  };

  const analyzeGaps = () => {
    const gaps = [];
    const storyText = currentStories.join(' ').toLowerCase();

    if (!storyText.includes('founded') && !storyText.includes('started') && !storyText.includes('began')) {
      gaps.push({
        category: 'Origin Stories',
        priority: 'High',
        gap: 'Missing Founder Journey',
        impact: 'Trust & Authenticity Risk',
        description: 'No narrative about why/how the organization was founded',
        recommendation: 'Develop founder story focusing on the problem that inspired creation'
      });
    }

    if (!storyText.includes('challenge') && !storyText.includes('problem') && !storyText.includes('difficult')) {
      gaps.push({
        category: 'Challenge & Recovery',
        priority: 'High',
        gap: 'No Failure Recovery Stories',
        impact: 'Credibility & Trust Gap',
        description: 'Missing narratives about overcoming customer challenges',
        recommendation: "Share stories of how you've helped customers through difficult situations"
      });
    }

    if (!storyText.includes('employee') && !storyText.includes('team') && !storyText.includes('career')) {
      gaps.push({
        category: 'Culture & Values',
        priority: 'Medium',
        gap: 'Employee Development Stories',
        impact: 'Retention & Recruitment Risk',
        description: 'No stories showing employee growth and development',
        recommendation: 'Highlight employee advancement and learning opportunities'
      });
    }

    if (!storyText.includes('innovation') && !storyText.includes('research') && !storyText.includes('development')) {
      gaps.push({
        category: 'Product Stories',
        priority: 'Medium',
        gap: 'Innovation Process Stories',
        impact: 'Competitive Positioning Gap',
        description: 'Missing narratives about how innovation happens',
        recommendation: 'Share behind-the-scenes stories of product development'
      });
    }

    if (!storyText.includes('industry') && !storyText.includes('expertise') && !storyText.includes('thought')) {
      gaps.push({
        category: 'Leadership Vision',
        priority: 'Low',
        gap: 'Industry Thought Leadership',
        impact: 'Authority & Influence Gap',
        description: 'No stories establishing industry expertise',
        recommendation: 'Develop content showing deep industry knowledge and future insights'
      });
    }

    if (stakeholderPriorities.includes('Local Community') && !storyText.includes('community') && !storyText.includes('impact')) {
      gaps.push({
        category: 'Culture & Values',
        priority: 'Medium',
        gap: 'Community Impact Stories',
        impact: 'Social License Risk',
        description: 'Missing narratives about community contribution',
        recommendation: 'Highlight local community involvement and social impact'
      });
    }

    const gapScore = Math.max(20, 100 - (gaps.length * 15));
    const riskScore =
      gaps.filter(g => g.priority === 'High').length * 25 +
      gaps.filter(g => g.priority === 'Medium').length * 15;

    setAnalysis({
      totalGaps: gaps.length,
      highPriorityGaps: gaps.filter(g => g.priority === 'High').length,
      gapScore: gapScore,
      riskScore: Math.min(100, riskScore),
      gaps: gaps,
      recommendations: gaps.slice(0, 3)
    });
  };

  const resetAnalysis = () => {
    setOrganizationType('');
    setCurrentStories([]);
    setStakeholderPriorities([]);
    setAnalysis(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Story Gap Mapper™</h1>
        <p className="text-gray-600">Identify critical missing narratives that your organization should be telling</p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800"><strong>Part of Internal Story Intelligence Platform</strong> - Systematic narrative analysis for organizational communications</p>
        </div>
      </div>

      {!analysis ? (
        <div className="space-y-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
              Organization Type
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {orgTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setOrganizationType(type)}
                  className={`p-3 text-sm rounded-lg border transition-colors ${
                    organizationType === type
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {organizationType && (
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                Current Story Inventory
              </h2>
              <p className="text-gray-600 mb-4">List the key stories your organization currently tells (any format: blogs, videos, presentations, etc.)</p>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="e.g., 'CEO founding story in About Us page'"
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addStory()}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addStory}
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
              </div>

              {currentStories.length > 0 && (
                <div className="space-y-2">
                  {currentStories.map((story, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{story}</span>
                      <button
                        onClick={() => removeStory(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Examples:</strong> Customer success case studies, founder origin story, employee spotlight features, product innovation narratives, company values in action
                </p>
              </div>
            </div>
          )}

          {currentStories.length > 0 && (
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
                Key Stakeholder Priorities
              </h2>
              <p className="text-gray-600 mb-4">Select your most important audiences (choose 3-5)</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stakeholderTypes.map(stakeholder => (
                  <button
                    key={stakeholder}
                    onClick={() => {
                      if (stakeholderPriorities.includes(stakeholder)) {
                        setStakeholderPriorities(stakeholderPriorities.filter(s => s !== stakeholder));
                      } else if (stakeholderPriorities.length < 5) {
                        setStakeholderPriorities([...stakeholderPriorities, stakeholder]);
                      }
                    }}
                    className={`p-3 text-sm rounded-lg border transition-colors ${
                      stakeholderPriorities.includes(stakeholder)
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                    }`}
                    disabled={!stakeholderPriorities.includes(stakeholder) && stakeholderPriorities.length >= 5}
                  >
                    {stakeholder}
                  </button>
                ))}
              </div>

              {stakeholderPriorities.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {stakeholderPriorities.length}/5
                </p>
              )}
            </div>
          )}

          {stakeholderPriorities.length > 0 && (
            <button
              onClick={analyzeGaps}
              className="w-full bg-red-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Analyze Story Gaps
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Total Gaps Found</h3>
              <div className="text-3xl font-bold text-red-600">{analysis.totalGaps}</div>
              <p className="text-sm text-red-700 mt-1">Missing story categories</p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">Risk Score</h3>
              <div className="text-3xl font-bold text-orange-600">{analysis.riskScore}/100</div>
              <p className="text-sm text-orange-700 mt-1">Narrative vulnerability</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Story Completeness</h3>
              <div className="text-3xl font-bold text-green-600">{analysis.gapScore}/100</div>
              <p className="text-sm text-green-700 mt-1">Narrative coverage</p>
            </div>
          </div>

          {analysis.gaps.length > 0 && (
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Critical Story Gaps Identified
              </h2>

              <div className="space-y-4">
                {analysis.gaps.map((gap, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{gap.gap}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        gap.priority === 'High' ? 'bg-red-100 text-red-800' :
                        gap.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {gap.priority} Priority
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-2">{gap.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-red-600 text-sm font-medium">Impact: {gap.impact}</span>
                      <span className="text-blue-600 text-sm">Category: {gap.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              Priority Recommendations
            </h2>

            <div className="space-y-4">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-green-800 mb-2">
                    {index + 1}. Address {rec.gap}
                  </h3>
                  <p className="text-green-700 text-sm">{rec.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Story Category Framework</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {storyCategories.map(category => {
                const Icon = category.icon;
                return (
                  <div key={category.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={resetAnalysis}
            className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Analyze Another Organization
          </button>
        </div>
      )}

      <div className="mt-12 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          Story Gap Mapper™ is part of the Internal Story Intelligence Platform - systematic narrative analysis for organizational communications
        </p>
      </div>
    </div>
  );
};

export default StoryGapMapper;
