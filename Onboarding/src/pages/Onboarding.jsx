import React from 'react'
import Layout from '../components/layout/Layout'
import HeroSection from '../components/onboarding/HeroSection'
import DiscoverSection from '../components/onboarding/DiscoverSection'
import EducationalJourney from '../components/onboarding/EducationalJourney'
import MeetingRoles from '../components/onboarding/MeetingRoles'
import CommunitySection from '../components/onboarding/CommunitySection'
import ImprovementCycle from '../components/onboarding/ImprovementCycle'
import RecognitionSection from '../components/onboarding/RecognitionSection'
import GettingStarted from '../components/onboarding/GettingStarted'
import ResourcesSection from '../components/onboarding/ResourcesSection'
import FeedbackForm from '../components/onboarding/FeedbackForm'

const Onboarding = () => {
  return (
    <Layout>
      <HeroSection />
      <DiscoverSection />
      <EducationalJourney />
      <MeetingRoles />
      <CommunitySection />
      <ImprovementCycle />
      <RecognitionSection />
      <ResourcesSection />
      <GettingStarted />
      <FeedbackForm />
    </Layout>
  )
}

export default Onboarding
