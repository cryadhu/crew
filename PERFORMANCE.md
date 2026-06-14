FPS Measurement
FPS is measured by tracking the time between consecutive frames, typically using requestAnimationFrame, and converting the average frame duration into frames per second (FPS = 1000 / frame time in ms). A rolling window of recent frame times is used to smooth fluctuations and compute metrics like p50 and p95. Additional signals like delayed timers (event loop lag) help detect when the JS thread is blocked, which indirectly affects FPS.

Bottleneck
When scrolling faster, I see frame drop of 1, but FPS stays an average of 58+

Tradeoff
Not sure if it is actually a tradeoff. The streamlined response is shown as Flatlist footercomponent, as I don't want to update the entire message state, once entire response is obtained, I push it to the message state.
