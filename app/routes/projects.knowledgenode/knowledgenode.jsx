// Landing page images
import knowledgeNode from '~/assets/knowledgenode.jpg';
import knowledgeNodeLarge from '~/assets/knowledgenode-large.jpg';
import knowledgeNodePlaceholder from '~/assets/knowledgenode-placeholder.jpg';

// Background image
import knowledgeNodeBackground from '~/assets/knowledgenode-background.jpg';
import knowledgeNodeBackgroundLarge from '~/assets/knowledgenode-background-large.jpg';
import knowledgeNodeBackgroundPlaceholder from '~/assets/knowledgenode-background-placeholder.jpg';

// Professor interface images
import knowledgeNodeAssessmentProfessor from '~/assets/knowledgenode-assessment-professor.jpg';
import knowledgeNodeAssessmentProfessorLarge from '~/assets/knowledgenode-assessment-professor-large.jpg';
import knowledgeNodeAssessmentProfessorPlaceholder from '~/assets/knowledgenode-assessment-professor-placeholder.jpg';

// Student interface images
import knowledgeNodeAssessmentStudent from '~/assets/knowledgenode-assessment-student.jpg';
import knowledgeNodeAssessmentStudentLarge from '~/assets/knowledgenode-assessment-student-large.jpg';
import knowledgeNodeAssessmentStudentPlaceholder from '~/assets/knowledgenode-assessment-student-placeholder.jpg';

// Explore communities images
import knowledgeNodeExplore from '~/assets/knowledgenode-explore.jpg';
import knowledgeNodeExploreLarge from '~/assets/knowledgenode-explore-large.jpg';
import knowledgeNodeExplorePlaceholder from '~/assets/knowledgenode-explore-placeholder.jpg';

// Background bar image
import knowledgeNodeBackgroundBar from '~/assets/knowledgenode-background-bar.jpg';
import knowledgeNodeBackgroundBarLarge from '~/assets/knowledgenode-background-bar-large.jpg';
import knowledgeNodeBackgroundBarPlaceholder from '~/assets/knowledgenode-background-bar-placeholder.jpg';

// Profile customization images
import knowledgeNodeProfile from '~/assets/knowledgenode-profile.jpg';
import knowledgeNodeProfileLarge from '~/assets/knowledgenode-profile-large.jpg';
import knowledgeNodeProfilePlaceholder from '~/assets/knowledgenode-profile-placeholder.jpg';

// Questions feature images
import knowledgeNodeQuestions from '~/assets/knowledgenode-questions.jpg';
import knowledgeNodeQuestionsPlaceholder from '~/assets/knowledgenode-questions-placeholder.jpg';
import knowledgeNodeQuestionsLarge from '~/assets/knowledgenode-questions-large.jpg';
import knowledgeNodeSearchPoll from '~/assets/knowledgenode-search-poll.jpg';
import knowledgeNodeSearchPollLarge from '~/assets/knowledgenode-search-poll-large.jpg';
import knowledgeNodeSearchPollPlaceholder from '~/assets/knowledgenode-search-poll-placeholder.jpg';
import knowledgeNodeBookmarks from '~/assets/knowledgenode-bookmarks.jpg';
import knowledgeNodeBookmarksLarge from '~/assets/knowledgenode-bookmarks-large.jpg';
import knowledgeNodeBookmarksPlaceholder from '~/assets/knowledgenode-bookmarks-placeholder.jpg';

// Chat section images
import knowledgeNodeChatLive from '~/assets/knowledgenode-chat-live.jpg';
import knowledgeNodeChatLiveLarge from '~/assets/knowledgenode-chat-live-large.jpg';
import knowledgeNodeChatLivePlaceholder from '~/assets/knowledgenode-chat-live-placeholder.jpg';
import knowledgeNodeNotifications from '~/assets/knowledgenode-notifications.jpg';
import knowledgeNodeNotificationsLarge from '~/assets/knowledgenode-notifications-large.jpg';
import knowledgeNodeNotificationsPlaceholder from '~/assets/knowledgenode-notifications-placeholder.jpg';

import { EmblaCarousel } from '~/components/embla-carousel';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import styles from './knowledgenode.module.css';

const title = 'KnowledgeNode: A One-Stop Knowledge Centre';
const description =
  'KnowledgeNode is a assessment-driven platform that empowers educators and learners to collaborate on assessment tasks, share resources, and engage in interactive discussions. Featuring dedicated interfaces for professors and students, along with intuitive tools for exploring communities, customizing profiles, asking questions, and searching for materials.';
const roles = ['Frontend', 'Backend', 'Database management', 'Deployment'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const KnowledgeNode = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.knowledgenode}>
        {/* Page Background */}
        <ProjectBackground
          src={knowledgeNodeBackground}
          srcSet={`${knowledgeNodeBackground} 1280w, ${knowledgeNodeBackgroundLarge} 2560w`}
          width={1280}
          height={800}
          placeholder={knowledgeNodeBackgroundPlaceholder}
          opacity={0.8}
        />

        {/* Project Header */}
        <ProjectHeader
          title={title}
          description={description}
          url="https://knowledgenode.vercel.app"
          roles={roles}
        />

        {/* Section 1: Landing Page (using ProjectImage for the special reveal/delay) */}
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${knowledgeNode} 800w, ${knowledgeNodeLarge} 1920w`}
              width={800}
              height={500}
              placeholder={knowledgeNodePlaceholder}
              alt="KnowledgeNode landing page screenshot"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        {/* Section 2: assessment Interfaces */}
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Bringing it together</ProjectSectionHeading>
              <ProjectSectionText>
                Educators urgently needed a more dynamic method to create truly interactive assessment tasks that foster real-time collaboration and meaningful discourse. Previously, each assessment was handled in strict isolation, severely restricting collaborative problem-solving and timely feedback among peers.
              </ProjectSectionText>
              <ProjectSectionText>
                My solution enabled seamless, concurrent access to assessments, empowering both educators and learners to effortlessly share valuable insights and update responses instantly.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${knowledgeNodeAssessmentProfessor} 350w, ${knowledgeNodeAssessmentProfessorLarge} 700w`}
                width={350}
                height={750}
                placeholder={knowledgeNodeAssessmentProfessorPlaceholder}
                alt="Professor interface of KnowledgeNode"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={`${knowledgeNodeAssessmentStudent} 350w, ${knowledgeNodeAssessmentStudentLarge} 700w`}
                width={350}
                height={750}
                placeholder={knowledgeNodeAssessmentStudentPlaceholder}
                alt="Student interface of KnowledgeNode"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        {/* Section 3: Explore Communities */}
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Enhancing course engagement</ProjectSectionHeading>
              <ProjectSectionText>
                A challenge we frequently encountered was that students struggled to discover and enroll in courses that resonated with their academic interests. To remedy this, I created a dedicated explore page that consolidates all course modules into a single, intuitive interface. Furthermore, I enabled quick enrollment and bookmarking, allowing students to easily join courses and engage with a thriving learning community. Overall, this enhancement has revolutionized course discovery for our students.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${knowledgeNodeExplore} 800w, ${knowledgeNodeExploreLarge} 1920w`}
              width={800}
              height={500}
              placeholder={knowledgeNodeExplorePlaceholder}
              alt="Explore different course communities on KnowledgeNode"
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        
        {/* Section 4: Profile Customization */}
        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridBackground}>
                <Image
                  srcSet={`${knowledgeNodeBackgroundBar} 440w, ${knowledgeNodeBackgroundBarLarge} 880w`}
                  width={440}
                  height={790}
                  placeholder={knowledgeNodeBackgroundBarPlaceholder}
                  alt=""
                  role="presentation"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                />
              </div>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={`${knowledgeNodeProfile} 440w, ${knowledgeNodeProfileLarge} 880w`}
                  width={440}
                  height={340}
                  placeholder={knowledgeNodeProfilePlaceholder}
                  alt="Customize your personal profile on KnowledgeNode"
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Meaningful details</ProjectSectionHeading>
              <ProjectSectionText>
                Customizing your profile page is fundamental to expressing your unique academic and professional identity. I designed interactive personalization features that allow users to tailor their profiles with ease. This dynamic interface not only reflects individual style but also adapts seamlessly to evolving preferences, ensuring a truly personalized experience. Every adjustment reinforces a sense of belonging and professionalism within the community.
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Section 5: Engage and Inquire */}
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Engage and Inquire</ProjectSectionHeading>
              <ProjectSectionText>
                Our platform empowers educators and learners to drive community engagement by posting questions, launching polls, and uploading helpful PDF resources. This asynchronous communication framework enables users to share insights, seek guidance, and build a valuable repository of knowledge that benefits the entire community.
              </ProjectSectionText>
            </ProjectTextRow>
            <EmblaCarousel
              placeholder={knowledgeNodeQuestionsPlaceholder}
              images={[
                {
                  srcSet: `${knowledgeNodeQuestions} 940w, ${knowledgeNodeQuestionsLarge} 1880w`,
                  placeholder: knowledgeNodeQuestionsPlaceholder,
                  alt: 'Question feed on KnowledgeNode',
                },
                {
                  srcSet: `${knowledgeNodeSearchPoll} 940w, ${knowledgeNodeSearchPollLarge} 1880w`,
                  placeholder: knowledgeNodeSearchPollPlaceholder,
                  alt: 'Search results with poll voting',
                },
                {
                  srcSet: `${knowledgeNodeBookmarks} 940w, ${knowledgeNodeBookmarksLarge} 1880w`,
                  placeholder: knowledgeNodeBookmarksPlaceholder,
                  alt: 'Bookmarked questions with embedded PDF viewer',
                },
              ]}
            />
          </ProjectSectionContent>
        </ProjectSection>

        {/* Section 7: Real-time Community Chat */}
        <ProjectSection padding="top" light>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Always connected</ProjectSectionHeading>
              <ProjectSectionText>
                KnowledgeNode features WebSocket-powered real-time chat within every community. Messages are anonymised after 24 hours, keeping discussions focused while protecting student privacy. A built-in profanity filter and an admin moderation panel allow professors to maintain a safe learning environment.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${knowledgeNodeChatLive} 491w, ${knowledgeNodeChatLiveLarge} 981w`}
                width={491}
                height={700}
                placeholder={knowledgeNodeChatLivePlaceholder}
                alt="Real-time community chat between two users"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={`${knowledgeNodeNotifications} 550w, ${knowledgeNodeNotificationsLarge} 1099w`}
                width={550}
                height={700}
                placeholder={knowledgeNodeNotificationsPlaceholder}
                alt="Real-time notifications drawer with reply alerts"
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        {/* Section 8: Full demo video */}
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>See it all in action</ProjectSectionHeading>
              <ProjectSectionText>
                A complete walkthrough of KnowledgeNode — from registration and community creation through to real-time assessment collaboration, Q&amp;A, and chat.
              </ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://player.vimeo.com/video/1181017894"
                title="KnowledgeNode full feature walkthrough"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
