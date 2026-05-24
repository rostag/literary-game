## ADDED Requirements

### Requirement: Host selects reveal mode at game creation
Feature: Reveal Mode Configuration
Rule: The host SHALL choose one of three reveal modes when creating a game; the chosen mode governs how any manual reveal is initiated for that game's lifetime.

#### Scenario: Consensus mode selected (default)
- **GIVEN** a host is creating a game
- **WHEN** the host selects "Consensus" as the reveal mode (or submits without selecting one)
- **THEN** the game SHALL be created with `revealMode: "consensus"`

#### Scenario: Host-approve mode selected
- **GIVEN** a host is creating a game
- **WHEN** the host selects "Host Approve" as the reveal mode
- **THEN** the game SHALL be created with `revealMode: "host-approve"`

#### Scenario: Host-only mode selected
- **GIVEN** a host is creating a game
- **WHEN** the host selects "Host Only" as the reveal mode
- **THEN** the game SHALL be created with `revealMode: "host-only"`

### Requirement: Consensus mode — unanimous agreement required before reveal
Rule: In consensus mode, a reveal proceeds only after every non-proposing player has agreed.

#### Scenario: Player proposes a reveal
- **GIVEN** the game mode is "consensus" and no reveal is pending
- **WHEN** any player requests a reveal
- **THEN** all other players SHALL see an in-game prompt asking them to agree or decline

#### Scenario: All other players agree
- **GIVEN** a reveal proposal is pending in consensus mode
- **WHEN** every player except the proposer clicks "Agree"
- **THEN** the game SHALL transition to the reveal phase and show `fullRevealText` to all players

#### Scenario: Any player declines
- **GIVEN** a reveal proposal is pending in consensus mode
- **WHEN** any player (other than the proposer) clicks "Decline"
- **THEN** the proposal SHALL be cancelled and the game SHALL continue playing

#### Scenario: Non-host proposer sees waiting state
- **GIVEN** a reveal proposal is pending in consensus mode
- **WHEN** the proposing player views their screen
- **THEN** they SHALL see a message indicating they are waiting for others to agree

### Requirement: Host-approve mode — host must approve a player's proposal
Rule: In host-approve mode, any player can request a reveal, but only the host's approval triggers it.

#### Scenario: Non-host player proposes a reveal
- **GIVEN** the game mode is "host-approve" and no reveal is pending
- **WHEN** a non-host player requests a reveal
- **THEN** the host SHALL see an in-game prompt asking them to approve or decline

#### Scenario: Host approves
- **GIVEN** a reveal proposal is pending in host-approve mode
- **WHEN** the host clicks "Approve"
- **THEN** the game SHALL transition to the reveal phase and show `fullRevealText` to all players

#### Scenario: Host declines
- **GIVEN** a reveal proposal is pending in host-approve mode
- **WHEN** the host clicks "Decline"
- **THEN** the proposal SHALL be cancelled and the game SHALL continue playing

#### Scenario: Non-host player cannot approve
- **GIVEN** a reveal proposal is pending in host-approve mode
- **WHEN** a non-host player attempts to approve
- **THEN** the server SHALL reject the request

### Requirement: Host-only mode — host triggers reveal unilaterally
Rule: In host-only mode, only the host has a reveal control; clicking it immediately ends the game.

#### Scenario: Host triggers reveal
- **GIVEN** the game mode is "host-only"
- **WHEN** the host activates the reveal control
- **THEN** the game SHALL immediately transition to the reveal phase for all players

#### Scenario: Non-host has no reveal control
- **GIVEN** the game mode is "host-only"
- **WHEN** a non-host player views the game screen
- **THEN** no reveal control SHALL be visible to them

#### Scenario: Non-host cannot trigger reveal via API
- **GIVEN** the game mode is "host-only"
- **WHEN** a non-host player sends a reveal request directly
- **THEN** the server SHALL reject the request with a 403 error

### Requirement: Reveal controls are positioned in the top-right corner
Rule: The reveal trigger and language selector SHALL be grouped in a persistent top-right controls area to reduce accidental activation.

#### Scenario: Controls visible in top-right during play
- **GIVEN** a player is on any game screen (loading, lobby, writing, reveal)
- **WHEN** the screen renders
- **THEN** the language selector and (if permitted by mode) the reveal control SHALL be visible in the top-right corner as small, unobtrusive elements

## MODIFIED Requirements

## REMOVED Requirements
