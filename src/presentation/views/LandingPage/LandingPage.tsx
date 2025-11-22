import * as S from "./LandingPage.Styles";
import { MainButton } from "@src/presentation/components/Buttons/MainButton";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@src/presentation/store/authStore";
import { useTheme } from "styled-components";
import { LatestPostsTable } from "@src/presentation/components/LatestPostsTable/LatestPostsTable";

function LandingPage() {
  const navigate = useNavigate();
  const { userTask } = useAuthStore();
  const user = userTask.status === "successful" ? userTask.data : null;
  const theme = useTheme();

  return (
    <S.Wrapper>
      <S.IntroSection>
        <S.Title>
          Welcome to <span>CultureTxt</span>
        </S.Title>
        <S.Subtitle>
          A space to share your words, culture, and imagination.
        </S.Subtitle>
        <S.Description>
          Here, every voice matters. Create thoughtful posts, essays, and
          reflections with our intuitive writing tools. Whether you’re a writer,
          a thinker, or simply someone with a story to tell — this is your space
          to express it.
        </S.Description>

        <S.Description>
          Save your ideas as{" "}
          <S.ColorSpan $color={theme.colors.blue}>drafts</S.ColorSpan> to keep
          them personal, or{" "}
          <S.ColorSpan $color={theme.colors.primary}>publish</S.ColorSpan> them
          when you're ready to share your stories with the world.
        </S.Description>

        <S.ActionBlock>
          {user ? (
            <MainButton onClick={() => navigate(`/posts/${user?.id}/create`)}>
              Start writing
            </MainButton>
          ) : (
            <MainButton onClick={() => navigate("/login")}>
              Join and start writing
            </MainButton>
          )}
        </S.ActionBlock>
      </S.IntroSection>

      <S.Features>
        <S.FeatureCard>
          <h4>✍️ Create</h4>
          <p>Write and format your texts easily with our modern editor.</p>
        </S.FeatureCard>

        <S.FeatureCard>
          <h4>🌍 Discover</h4>
          <p>
            Explore posts from people sharing culture, stories, and insights
            from around the world.
          </p>
        </S.FeatureCard>

        <S.FeatureCard>
          <h4>💬 Connect</h4>
          <p>Comment, discuss, and build a community of creative minds.</p>
        </S.FeatureCard>
      </S.Features>

      <S.IntroSection>
        <S.SectionTitle>Latest Posts</S.SectionTitle>
        <LatestPostsTable />
      </S.IntroSection>
    </S.Wrapper>
  );
}

export { LandingPage };
